<template>
    <div class="wrapper">
        <div class="chatbot">
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
$bot-width:  300px;
$bot-height: 400px;


.wrapper {
    position: fixed;
    bottom: 10px;
    right: 20px;
    width: $bot-width;
    height: $bot-height;
    border-radius: $border;
    z-index: 10;

    .chatbot {
        padding: 14px;
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        background-color: $chat-background;
        border-radius: $border;

        &::-webkit-scrollbar {
            width: 0.6em;
            height: 30px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #403D56;
            border-radius: $border;
        }
    }
}
</style>