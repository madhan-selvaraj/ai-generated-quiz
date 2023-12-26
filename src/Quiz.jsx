import * as RadioGroup from "@radix-ui/react-radio-group";

// eslint-disable-next-line react/prop-types
const Quiz = ({ questions }) => {
  return (
    <div>
      {/* eslint-disable-next-line react/prop-types */}
      {questions.map((question, questionIndex) => (
        <div key={question.question}>
          <strong>{question.question}</strong>
          <RadioGroup.Root className="RadioGroupRoot" defaultValue="default">
            {question.answerChoices.map((choice, choiceIndex) => (
              <div
                key={choiceIndex}
                style={{ display: "flex", alignItems: "center" }}
              >
                <RadioGroup.Item
                  className="RadioGroupItem"
                  value="default"
                  id={`${questionIndex}-${choiceIndex}`}
                >
                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                </RadioGroup.Item>
                <label
                  className="Label"
                  htmlFor={`${questionIndex}-${choiceIndex}`}
                >
                  {choice}
                </label>
              </div>
            ))}
          </RadioGroup.Root>
        </div>
      ))}

      <button type="button">Check answers</button>
    </div>
  );
};

export default Quiz;
