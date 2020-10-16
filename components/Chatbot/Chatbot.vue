<template>
    <div class="wrapper">
        <div class="chatbot">
            <ul class="body">
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Edson" />
                <Message text="Oi, Edson" type="question"/>
                <Message text="Oi, Edson" type="question"/>
                <Message text="Oi, Edson" type="question"/>
                <Message text="Oi, Edson" type="question"/>
                <Message text="Oi, Edson" type="question"/>
            </ul>
        </div>
    </div>
</template>

<script>
import Message from './ChabotMessage'

export default {
    name: "Chatbot",
    components: {
        Message
    }
}
</script>

<style lang="scss" scoped>
$border: 12px;
$chat-background: #F5F7FB;
$bot-width:  320px;
$bot-height: 420px;


.wrapper {
    position: fixed;
    bottom: 10px;
    right: 20px;
    width: $bot-width;
    padding: 2px;
    background-color: $chat-background;
    height: $bot-height;
    border-radius: $border;
    
    z-index: 10;

    .chatbot {
        padding: 20px;
        position: relative;
        width: 99%;
        height: 100%;
        overflow-y: scroll;
        background-color: $chat-background;
        border-radius: $border;

        .body {
            width: 100%;
            margin: 0;
            padding: 0;
            position: relative;
        }

        &::-webkit-scrollbar {
            width: 0.4em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #403D56;
            border-radius: $border;
        }
    }
}
</style>