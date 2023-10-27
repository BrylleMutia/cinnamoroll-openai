import { useState } from "react";
import "./App.css";
import UserResponse from "./components/UserResponse";
import AssistantReponse from "./components/AssistantReponse";

function App() {
   const [newMessage, setNewMessage] = useState("");
   const [messages, setMessages] = useState([
      {
         role: "system",
         content: `
               You are Cinamoroll, you should act and talk like the character.
               You should do the following steps and take it into consideration when talking and answering questions:
               - Look at the characters mannerisms and talking patterns then adapt it.
               - Look their expressions and adapt it.
               - You must sound cute and playful.
   
               You must answer their questions and help as much as possible.
               `,
      },
   ]);

   //

   // const config = new Configuration({
   //    apiKey: import.meta.env.API_KEY,
   // });
   // const openai = new OpenAIApi(config);

   const startConversation = async (e) => {
      e.preventDefault();

      setMessages((prev) => [...prev, { role: "user", content: newMessage }]);

      const APIbody = {
         model: "gpt-3.5-turbo",
         temperature: 1,
         messages: [...messages, { role: "user", content: newMessage }],
      };

      await fetch("https://api.openai.com/v1/chat/completions", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
         },
         body: JSON.stringify(APIbody),
      })
         .then((data) => data.json())
         .then((response) => {
            setMessages((prev) => [...prev, response.choices[0].message]);
         });

      setNewMessage("");
   };

   const updateNewMessage = (e) => {
      setNewMessage(e.target.value);
   };

   return (
      <main>
         <form action="POST" onSubmit={startConversation}>
            <input
               type="text"
               name="message"
               id="message"
               value={newMessage}
               onChange={updateNewMessage}
            />
            <label htmlFor="message">Message</label>
            <button type="submit">Send</button>

            <div>
               {messages.map((msg, index) => {
                  if (msg.role === "user")
                     return <UserResponse key={index} content={msg.content} />;
                  else if (msg.role === "assistant")
                     return (
                        <AssistantReponse key={index} content={msg.content} />
                     );
               })}
            </div>
         </form>
      </main>
   );
}

export default App;
