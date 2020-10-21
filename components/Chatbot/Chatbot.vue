<template>
    <div :class="chatClass">
        <div class="wrapper-click" @click="expand" v-if="!chatIsOpen"/>
        <i :class="iconChatClass" @click="expand"/>
        <div class="chatbot" v-if="chatIsOpen" ref="chat">
            <ul class="body">
                <Message :text="message.value" :type="message.type" v-for="(message, index) in messages" :key="index" />
                <Message v-if="loading" :isLoading="loading" text="el-icon-more" />
            </ul>
        </div>
        <div class="footer" v-if="chatIsOpen">
            <input ref="inputMessage" class="input-chat" v-model="message" @keydown.enter.prevent="sendMessage"/>
            <el-button @click="sendMessage" class="send-message" type="primary" icon="el-icon-position" plain size="mini" round/>
        </div>
    </div>
</template>

<script>
import Message from './ChabotMessage'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "Chatbot",
    components: {
        Message
    },
    data() {
        return {
            chatIsOpen: false,
            message: '',
            waitingResponse: false,
            loading: false,
            buildText: () => {}
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
        },
        pesquisa() {
            return {
                "Ok, aguarde só um momento enquanto pesquiso as informações": this.getPriceInsuranceCompany
            }
        }
    },
    methods: {
        expand(value) {
            this.chatIsOpen = !this.chatIsOpen
        },
        clearInputMessage() {
            this.message = ""
        },
        buildTextAfterResponse(response) {
            if(Array.isArray(response)){
                return this.buildText(response)
            }
        },
        buildTextPriceInformation(response) {
            const texts = response.map(info => 
                    `Idade: ${info.idade}
                    Preços: ${info.preco}
                `
            )
            return texts.join('\n')
        },
        async buildReponse(message){
            this.$store.commit('updateMessages', { value: message, type: "question" })

            this.clearInputMessage()            

            const response = await this.callAfterResponse(message)
            
            const text = this.buildTextAfterResponse(response)
            
            this.sendBotMessage(text)

            this.waitingResponse = false
        },
        async sendMessage(){
            const message = this.message
            if(message === "") return

            this.loading = true

            if(this.waitingResponse) {
                await this.buildReponse(message)
                this.loading = false
                return
            }


            this.$store.commit('updateMessages', { value: message, type: "question" })

            this.clearInputMessage()
     
            this.scrollChat()

            await this.showResponse(message)

            this.loading = false
        },
        sendBotMessage(message, delay = 500){
             setTimeout(() => {
                this.$store.commit('updateMessages', { value: message, type: "answer" })
                this.scrollChat()
            }, 500)
        },
        async getPriceInsuranceCompany() {
            this.sendBotMessage("Por favor, informe o nome da seguradora")
            this.waitingResponse = true
            this.callAfterResponse = this.getPrice
            this.buildText =  this.buildTextPriceInformation
        },
        async getPrice(message) {
            const { data } = await this.$axios.get(`/price?name=${message}`)

            return data
        },
        async showResponse(message) {
            const { resposta } = await this.findWord(message);
            
            if(resposta.includes("Desculpe")){
                this.sendBotMessage(resposta)
                return
            }
            const response = this.pesquisa[resposta]

            if(response){
                await response()
            }
        },
        async findWord(message) {
            // necessário trocar para pegar do .env
            const { data } = await axios.get(`http://127.0.0.1:3001/question?pergunta=${message}`)

            return data
        },
        scrollChat() {
            const chatEl = this.$refs.chat
            
            setTimeout(() => {
                chatEl.scrollTo(0, chatEl.scrollHeight)
            }, 250)
        }
    },
    watch: {
        chatIsOpen(isOpen) {
            if(isOpen){
                setTimeout(() => {
                    this.$refs.inputMessage.focus()
                    this.scrollChat()
                }, 500)
            }
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
        scroll-behavior: smooth;
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