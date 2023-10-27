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

      setMessages((prev) => [{ role: "user", content: newMessage }, ...prev]);

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
            setMessages((prev) => [response.choices[0].message, ...prev]);
         });

      setNewMessage("");
   };

   const updateNewMessage = (e) => {
      setNewMessage(e.target.value);
   };

   return (
      <main>
         <form
            action="POST"
            onSubmit={startConversation}
            className="flex flex-col"
         >
            <textarea
               type="text"
               name="message"
               id="message"
               className="w-[100%] h-[8em] border-2 focus:border-sky-400 outline-none my-5 p-2 rounded"
               wrap="hard"
               value={newMessage}
               onChange={updateNewMessage}
               placeholder={
                  messages.length === 1
                     ? "Hi, I'm Cinamoroll. How can I help you today?"
                     : "Reply to Cinamoroll."
               }
            />
            <button className="bg-sky-700 p-1 rounded" type="submit">
               Send
            </button>

            <div className="my-8">
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
