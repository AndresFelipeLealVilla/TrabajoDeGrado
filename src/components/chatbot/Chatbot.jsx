import React, {useEffect} from 'react'

function Chatbot() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "60ae545f-157e-46a3-8912-4255c6f66139", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "1dd30ec1-85bd-4b93-a3fe-73177731eb46", // The ID of your service instance.
      onLoad: function(instance) { instance.render(); }
    };
    setTimeout(function(){
      const t=document.createElement('script');
      t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  },[])

  return (
    <div>
      
    </div>
  )
}

export default Chatbot
