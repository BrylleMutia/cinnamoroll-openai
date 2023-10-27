import React from "react";

const AssistantReponse = ({ content }) => {
   return (
      <div
         className="speech-bubble pleft acenter my-4"
         style={{ "--bbColor": " #086899" }}
      >
         <p>{content}</p>
      </div>
   );
};

export default AssistantReponse;
