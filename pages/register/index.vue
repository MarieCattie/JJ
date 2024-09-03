<template>
    <div class="register-welcome">
        <img :src="logoBig" alt="" />
        <p class="register-welcome__postitle mt-5">
            Начни зарабатывать вместе с нами!
        </p>
        <div class="flex justify-center flex-wrap items-center gap-4 xl:gap-7 mt-7">
            <NuxtLink to="/register/applicant" class="btn register-welcome__btn">Я соискатель</NuxtLink>
            <NuxtLink to="/register/employer" class="btn register-welcome__btn">Я работодатель</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits, watch, ref } from 'vue'
import logoBig from "@/assets/images/big-logo.svg";
definePageMeta({
    layout: "empty",
});
</script>

<style lang="scss" scoped>
.register-welcome {
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__postitle {
        color: #2c1b47;
        text-align: center;
        font-size: 25px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    &__btn {
        padding: 12px 35px;
        min-width: 276px;
    }

    @media (max-width: 490px) {
        padding-left: 50px;
        padding-right: 50px;
    }
}

.btn {
    padding: 11px 20px;
    border-radius: 20px;
    background: #aaa2d8;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    user-select: none;
}

.btn-outline {
    padding: 11px 20px;
    border-radius: 20px;
    border: 2px solid #aaa2d8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa2d8;
    text-align: center;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.btn--small {
    padding: 10px;
    font-size: 16px;
    line-height: normal;
}

.btn:hover,
.btn:focus {
    background: #aaa2d8;
    background: -moz-linear-gradient(-45deg,
            #aaa2d8 0%,
            #aaa2d8 40%,
            #ccc4f7 50%,
            #aaa2d8 60%,
            #aaa2d8 100%);
    background: -webkit-gradient(linear,
            left top,
            right bottom,
            color-stop(0%, #aaa2d8),
            color-stop(40%, #aaa2d8),
            color-stop(50%, #ccc4f7),
            color-stop(60%, #aaa2d8),
            color-stop(100%, #aaa2d8));
    background: -webkit-linear-gradient(-45deg,
            #aaa2d8 0%,
            #aaa2d8 40%,
            #ccc4f7 50%,
            #aaa2d8 60%,
            #aaa2d8 100%);
    background: -o-linear-gradient(-45deg,
            #aaa2d8 0%,
            #aaa2d8 40%,
            #ccc4f7 50%,
            #aaa2d8 60%,
            #aaa2d8 100%);
    background: -ms-linear-gradient(-45deg,
            #aaa2d8 0%,
            #aaa2d8 40%,
            #ccc4f7 50%,
            #aaa2d8 60%,
            #aaa2d8 100%);
    background: linear-gradient(135deg,
            #aaa2d8 0%,
            #aaa2d8 40%,
            #ccc4f7 50%,
            #aaa2d8 60%,
            #aaa2d8 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#AAA2D8', endColorstr='#AAA2D8', GradientType=1);
    background-size: 1000px;
    -webkit-animation: btnBlink 0.9s;
    animation: btnBlink 0.9s;
}

@-webkit-keyframes btnBlink {
    0% {
        background-position: -600px;
    }

    100% {
        background-position: 0px;
    }
}

@-moz-keyframes btnBlink {
    0% {
        background-position: -600px;
    }

    100% {
        background-position: 0px;
    }
}

@keyframes btnBlink {
    0% {
        background-position: -600px;
    }

    100% {
        background-position: 0px;
    }
}
</style>