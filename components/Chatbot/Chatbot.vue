<template>
    <div :class="chatClass" @click="expand">
        <i :class="iconChatClass" />
        <div class="chatbot" v-if="chatIsOpen">
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
    },
    data() {
        return {
            chatIsOpen: false,
        }
    },
    computed: {
        chatClass(){
            return ['wrapper', this.chatIsOpen ? 'expand' : 'normal']
        },
        iconChatClass() {
            return this.chatIsOpen ? 'el-icon-close close' : 'el-icon-chat-round'
        }
    },
    methods: {
        expand() {
            this.chatIsOpen = !this.chatIsOpen
        }
    }
}
</script>

<style lang="scss" scoped>
$border: 12px;
$chat-background: #F5F7FB;
$bot-width:  320px;
$bot-height: 420px;

$bot-width-normal: 60px;
$bot-height-normal: 60px;

.close {
    float: right;
    margin-right: 12px;
    margin-top: 10px;
    font-size: 22px;
    cursor: pointer;
}

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
        height: 92%;
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

.normal {
    width: $bot-width-normal;
    height: $bot-height-normal;
    border-radius: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
}
</style>