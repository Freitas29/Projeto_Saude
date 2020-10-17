<template>
    <div :class="chatClass">
        <div class="wrapper-click" @click="expand" v-if="!chatIsOpen"/>
        <i :class="iconChatClass" @click="expand"/>
        <div class="chatbot" v-if="chatIsOpen">
            <ul class="body">
                <Message :text="message.value" :type="message.type" v-for="(message, index) in messages" :key="index" />
            </ul>
        </div>
        <div class="footer" v-if="chatIsOpen">
            <input class="input-chat" v-model="message" @keydown.enter.prevent="sendMessage"/>
            <el-button @click="sendMessage" class="send-message" type="primary" icon="el-icon-position" plain size="mini" round/>
        </div>
    </div>
</template>

<script>
import Message from './ChabotMessage'
import { mapState } from 'vuex'
export default {
    name: "Chatbot",
    components: {
        Message
    },
    data() {
        return {
            chatIsOpen: false,
            message: ''
        }
    },
    computed: {
        ...mapState({
            messages: state => {
                return state.messages
            }
        }),
        chatClass(){
            return ['wrapper', this.chatIsOpen ? 'expand' : 'normal']
        },
        iconChatClass() {
            return this.chatIsOpen ? 'el-icon-close close' : 'el-icon-chat-round'
        }
    },
    methods: {
        expand(value) {
            this.chatIsOpen = !this.chatIsOpen
        },
        sendMessage(){
            if(this.message === "") return

            this.$store.commit('updateMessages', {value: this.message, type: "question" })

            setTimeout(() => {
                this.$store.commit('updateMessages', {value: "Oi, testeando", type: "answer"})
            }, 500)

            this.message = ""
        }
    }
}
</script>

<style lang="scss" scoped>
$border: 12px;
$chat-background: #3F3D56;
$bot-width:  320px;
$bot-height: 420px;

$bot-width-normal: 60px;
$bot-height-normal: 60px;
$chat-background-normal: #CCCCCC;

$animation-delay: 0.4s;

.footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 35px;
    display: flex;
    padding: 5px 15px;
    align-items: center;
    justify-content: space-around;

    .input-chat {
        background-color: #babaca;
        width: 100%;
        height: 110%;
        border: none;
        outline: none;
        border-radius: 12px;
        padding: 5px 10px;
        font-size: 14px;
    }
}

.send-message{
    margin-left: 7px;
    font-size: 15px;
    background-color: #babaca;
}

.wrapper-click {
    height: 100%;
    width: 100%;
    position: absolute;
    border-radius: $border;
}

.close {
    float: right;
    margin-right: 12px;
    margin-top: 10px;
    font-size: 22px;
    cursor: pointer;
    color: #fff;
}

.wrapper {
    position: fixed;
    bottom: 10px;
    right: 20px;
    width: $bot-width;
    padding: 2px;
    padding-bottom: 40px;
    background-color: $chat-background;
    height: $bot-height;
    border-radius: $border;
    transition: all $animation-delay;
    box-shadow: 0px 1px 3px rgb(63, 61, 86), 0px 1px 2px rgb(63, 61, 86);
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
            height: 100%;
        }

        &::-webkit-scrollbar {
            width: 0.4em;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #02C39A;
            border-radius: $border;
        }
    }
}

.normal {
    width: $bot-width-normal;
    height: $bot-height-normal;
    border-radius: 100%;
    background-color: $chat-background-normal;
    text-align: center;
    display: flex;
    align-items: center;
    padding-bottom: initial;

    justify-content: center;
    font-size: 30px;
    transition: all $animation-delay;
    cursor: pointer;
}
</style>