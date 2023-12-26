import OpenAI from "openai";
import useSWR from "swr";
import Form from "./Form";
import Quiz from "./Quiz";

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const domain = urlParams.get("domain");
  const topic = urlParams.get("topic");
  const apiKey = urlParams.get("openai_api_key");

  const queryKey =
    domain && topic && apiKey
      ? `quiz/${domain}/${topic}?apiKey=${apiKey}`
      : null;

  const { data: questions, isLoading } = useSWR(
    queryKey,
    async () => {
      const openai = new OpenAI({
        apiKey:
          import.meta.env.mode === "development"
            ? import.meta.env.VITE_OPENAI_API_KEY
            : apiKey,
        dangerouslyAllowBrowser: true, // Run only in server environment, else API key will be exposed
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "user",
            content: `Your a helpful assistant that generates quiz based on the domain ${domain}, topic ${topic} and difficulty mode ${"easy"} given. the response should be only json with fields - question, answerChoices(4), correctAnswerIndex. generate 5 questions. no extra text or explanation. just JSON serializable response`,
          },
        ],
      });

      return JSON.parse(
        chatCompletion.choices[0].message.content.replace("\n", "").questions
      );
    },
    {
      revalidateOnMount: false,
      revalidateIfStale: false,
    }
  );

  if (isLoading) return <img src="/copywriting.gif" alt="Loading" />;
  if (!questions) return <Form />;

  return (
    <main>
      <Quiz questions={questions} />
    </main>
  );
};

{
  /* <a
  href="https://www.flaticon.com/free-animated-icons/message"
  title="message animated icons"
>
  Message animated icons created by Freepik - Flaticon
</a>; */
}
export default App;
