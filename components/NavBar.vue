<template>
  <el-row class="nav">
    <el-col :span="4" class="navbar__logo-box">
      <NuxtLink to="/">
        <img src="~/assets/pingo.png" alt="" class="navbar__logo" />
      </NuxtLink>
    </el-col>
    <el-col :span="20" class="navbar__menu-box" v-if="!isMobile">
      <ul class="el-menu el-menu--horizontal navbar__menu">
        <li class="el-menu-item" v-scroll-to="'#oQueSomos'">O que somos</li>

        
          <li class="el-menu-item" v-scroll-to="'#nossoProduto'">
            Nosso produto
          </li>
        
        <li class="el-menu-item" v-scroll-to="'#diferencial'">Diferencial</li>
      </ul>
    </el-col>

    <ul class="header__navbar" v-else>
      <li class="header__item">
        <a href="#" class="header__link">
          <transition name="slide-fade">
            <button
              class="header--button"
              v-if="show"
              key="on"
              @click="show = false"
            >
              <svg viewBox="0 0 24 24" class="header--icon">
                <title>Close</title>
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  fill="currentColor"
                  d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                />
              </svg>
            </button>
            <button
              class="header--button"
              v-else
              key="off"
              @click="show = true"
            >
              <svg viewBox="0 0 24 24" class="header--icon">
                <title>Navigation Menu</title>
                <path
                  fill="currentColor"
                  d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
                />
              </svg>
            </button>
          </transition>
        </a>
        <transition name="dropdown">
          <div
            class="dropdown__menu"
            v-bind:class="{ active: show }"
            v-if="show"
          >
            <ul class="dropdown__menu-nav">
              <li class="dropdown__menu-item" v-scroll-to="'#oQueSomos'">
                  <a href="#" class="dropdown__menu-link" title="Account">
                    <div class="dropdown__menu-svg">
                    </div>
                      <div class="dropdown__menu-text">O que somos</div>
                  </a>
              </li>
              <li class="dropdown__menu-item" v-scroll-to="'#nossoProduto'">
                  <a href="#" class="dropdown__menu-link" title="Account">
                    <div class="dropdown__menu-svg">
                    </div>
                      <div class="dropdown__menu-text" >Nosso produto</div>
                    
                  </a>
              </li>
              <li class="dropdown__menu-item" v-scroll-to="'#diferencial'">
                  <a href="#" class="dropdown__menu-link" title="Account">
                    <div class="dropdown__menu-svg">
                    </div>
                      <div class="dropdown__menu-text">Diferencial</div>
                  </a>
              </li>
            </ul>
          </div>
        </transition>
      </li>
    </ul>
  </el-row>
</template>

<script>
import mobileScreen from '../mixins/mobileScreen'

export default {
  name: 'NavBar',
  data() {
    return {
      show: false
    }
  },
  mixins: [mobileScreen],
}
</script>

<style lang="scss">
ul{
  list-style: none;
  position: fixed;
}
$primary: #1d3557;

.nav {
  background-color: $primary;
position: fixed;
    z-index: 1000;
    width: 100%;

  li {
    color: #ffffff !important;
    font-size: 18px !important;

  } 
}

.nav li:hover{
  background-color: #2a5fe4 !important;
}

a {
  text-decoration: none !important;
}

img {
  width: 40px;
  height: auto;
}
.navbar__logo-box {
  background-color: $primary;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar__menu-box {
  background-color: $primary;
  height: 60px;
}
.el-menu {
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-dropdown {
  display: block !important;
}

.menu {
  --color: #ffffff;
  background: none;
  width: 100px;
  height: 56px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  right: 0;
  position: absolute;
  svg {
    fill: none;
    stroke: var(--color);
    stroke-width: 7px;
    stroke-linecap: round;
    stroke-linejoin: round;
    use {
      &:nth-of-type(1) {
        opacity: 1;
        stroke-dashoffset: 221;
        stroke-dasharray: 46 249;
        transition: stroke-dashoffset 0.12s linear 0.2s,
          stroke-dasharray 0.12s linear 0.2s, opacity 0s linear 0.2s;
      }
      &:nth-of-type(2) {
        animation: stroke-animation-reverse 1.2s ease-out forwards;
      }
    }
  }
  input {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    cursor: pointer;
    opacity: 0;
    &:checked {
      + svg {
        use {
          &:nth-of-type(1) {
            stroke-dashoffset: 175;
            stroke-dasharray: 0 295;
            opacity: 0;
            transition: stroke-dashoffset 0.07s linear 0.07s,
              stroke-dasharray 0.07s linear 0.07s, opacity 0s linear 0.14s;
          }
          &:nth-of-type(2) {
            animation: stroke-animation 1.2s ease-out forwards;
          }
        }
      }
    }
  }
}

@keyframes stroke-animation {
  0% {
    stroke-dashoffset: 295;
    stroke-dasharray: 25 270;
  }
  50% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
  65% {
    stroke-dashoffset: 59;
    stroke-dasharray: 59 236;
  }
  100% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
}

@keyframes stroke-animation-reverse {
  0% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
  50% {
    stroke-dashoffset: 290;
    stroke-dasharray: 25 270;
  }
  65% {
    stroke-dashoffset: 295;
    stroke-dasharray: 25 270;
  }
  100% {
    stroke-dashoffset: 290;
    stroke-dasharray: 25 270;
  }
}

.header {
  padding: 2rem 5rem 2rem 5rem;
  &__nav {
    position: relative;
  }
  &__navbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: transparent !important;
    position: relative;

    li{
      &:hover {
        background-color: inherit !important;
      }
    }
  }
  &__item {

    &:hover{
      background-color: transparent !important;
    }
    padding: 1rem;
  }
  &--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
  &--button {
    top: 15px;
    right: 15px;
    position: absolute;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}


.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  height: 25rem;
  min-width: 300px;
  margin-top: 1rem;
  overflow-y: auto;
  padding: 2rem 1rem 2rem 0rem;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;

  .li:hover {
    background-color: transparent !important;
  }
  
  &.li:hover {
    background-color: transparent !important;
  }

  &-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 0 0.8rem 2rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
    &:hover {
      outline: none;
      color: #000;
      background-color: rgba(79, 192, 141, 0.1) !important;
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}


.el-menu.el-menu--horizontal {
  border: none;
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
