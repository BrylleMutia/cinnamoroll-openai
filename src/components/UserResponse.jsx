import React from "react";

const UserResponse = ({ content }) => {
   return (
      <div
         className="speech-bubble pright acenter my-4"
         style={{ "--bbColor": "#f5882f" }}
      >
         <p>{content}</p>
      </div>
   );
};

export default UserResponse;
