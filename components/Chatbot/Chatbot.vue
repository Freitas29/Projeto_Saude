<template>
    <div :class="chatClass">
        <div class="wrapper-click" @click="expand" v-if="!chatIsOpen"/>
        <i :class="iconChatClass" @click="expand"/>
        <div class="chatbot" v-if="chatIsOpen" ref="chat">
            <ul class="body">
                <Message :text="message.value" :selection="message.selection" :type="message.type" v-for="(message, index) in messages" :key="index" />
                <Message v-if="loading" :isLoading="loading" text="el-icon-more"  />
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
                "Ok, aguarde só um momento enquanto pesquiso as informações": this.getPriceInsuranceCompany,
                "sintomas": this.getSymptoms,
                "O que gostaria de saber sobre o Covid-19": this.infoAboutCovid
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
        buildTextMundo(response) {
            const text = `Total no mundo

                Casos: ${this.formatNumbers(response.cases)}

                Confirmados: ${this.formatNumbers(response.confirmed)}
                
                Mortes: ${this.formatNumbers(response.deaths)}
                
                Recuperados: ${this.formatNumbers(response.recovered)}
            `
            return text
        },
        buildTextSintomas(response) {
            const text = response.map(sintoma => `${sintoma.includes(":") ? '\n' + sintoma  : sintoma}`)

            return text.join('\n')
        },
        formatNumbers(number) {
            return Number(number).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        },
        buildTextAfterResponseAboutCovid(options) {
            options.map(option => this.sendBotMessage(option, 500, this.callAfterClick))
        },
        async callAfterClick(selected) {
            const word = selected.toLowerCase()
            const opcoes = ['mundo', 'brasil', 'sintomas', 'prevenção']
            
            const request = opcoes.find(item => word.includes(item))
            
            this.loading = true

            if(!request){
                this.loading = false
                this.$store.commit('removeListening')
                return
            }
            this.$store.commit('removeListening')
            
            await this[request]()

            this.loading = false
            
            
        },
        async mundo() {
            const { data } = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1/countries")
            
            const result = data.data.reduce((acc, curr) => ({
                cases: acc.cases + curr.cases,
                confirmed: acc.cases + curr.cases,
                deaths: acc.deaths + curr.deaths,
                recovered: acc.recovered + curr.recovered
            }))

            this.sendBotMessage(this.buildTextMundo(result))
        },
        async sintomas() {
            const { data } = await this.$axios("/sintomas")

            this.sendBotMessage(this.buildTextSintomas(data))
        },
        async infoAboutCovid(response) {
            const [ about, ...options ] = response
            this.sendBotMessage(about)

            this.buildTextAfterResponseAboutCovid(options)
            
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
        sendBotMessage(message, delay = 500, selection){
             setTimeout(() => {
                this.$store.commit('updateMessages', { value: message, type: "answer", selection })
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

            const botResponse = Array.isArray(resposta) ? resposta[0] : resposta
            const response = this.pesquisa[botResponse]

            if(response){
                await response(resposta)
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