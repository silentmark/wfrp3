// Activate chat listeners defined in dice-wfrp3.js
Hooks.on('renderChatLog', (log, html, data) => {
    DiceWFRP.chatListeners(html)
    
});