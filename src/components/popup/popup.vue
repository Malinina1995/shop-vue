<template>
    <div class="popup_wrapper" ref="popup_wrapper">
        <div class="popup">
            <div class="popup__header">
                <span>{{popUpTitle}}</span>
                <span>
                    <i
                            class="material-icons popup-close"
                            @click="closePopup"
                    >close</i>
                </span>
            </div>
            <div class="popup__content">
                <slot></slot>
            </div>
            <div class="popup__footer">
                <button class="close-modal" @click="closePopup">Close</button>
                <button class="submit_btn" @click="rightBtnAction">{{rightBtnTitle}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popup",
        props: {
            rightBtnTitle: {
                type: String,
                default: 'Ok'
            },
            popUpTitle: {
                type: String,
            }
        },
        methods: {
            closePopup() {
                this.$emit('closePopup')
            },
            rightBtnAction(){
                this.$emit('rightBtnAction')
            }
        },
        mounted() {
            document.addEventListener('click', (item) => {
                if(item.target === this.$refs['popup_wrapper']){
                    this.closePopup()
                }
            })
        }
    }
</script>

<style lang="scss">
    .popup_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .popup {
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 400px;
        background: #ffffff;
        box-shadow: 0 0 17px 0 #e7e7e7;
        z-index: 10;

        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__content {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .submit_btn {
            padding: 8px;
            color: #ffffff;
            background: #26ae68;
        }

        .popup-close {
            cursor: pointer;
        }

        .close_modal {
            padding: 8px;
            color: #ffffff;
            background: red;
        }
    }
</style>
