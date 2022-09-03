import React from 'react'

function Chatbot() {
    window.watsonAssistantChatOptions = {
        integrationID: "b1773f90-6955-4a3e-801a-18852a983c7d", // The ID of this integration.
        region: "us-south", // The region your integration is hosted in.
        serviceInstanceID: "dd87d7f4-100b-4b5f-8a0e-21c4f4cdb9e3", // The ID of your service instance.
        onLoad: function(instance) { instance.render(); }
      };
      setTimeout(function(){
        const t=document.createElement('script');
        t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
        document.head.appendChild(t);
      });
}

export default Chatbot
