import { createApp, ref, onMounted, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = createApp({
    setup () {

        // 判断游戏的状态，0 首页， 1选择角色， 2选择地图， 3正在游戏， 4等待重玩
        const status = ref(0)



        // 选择宠物时的图片地址
        const roleList = ref([
            './img/cat/animated-gamecat-nyan.gif',
            './img/bird/player4.gif',
            './img/cat/animated-jazz-nyan.gif',
            './img/cat/animated-lifealope-nyan.gif',
            './img/cat/animated-nyan-hip.gif',
            './img/cat/animated-nyancoin.gif'
        ])


        // 页面开始时小鸟的动画
        const Time = (id) => {
            timer = setInterval(() => {

                // 根据小鸟的状态来更换图片， 先将地址解析，判断赋值，再将新的地址拼接回去
                const bird = document.querySelector(id)
                let nowImg = window.getComputedStyle(bird).backgroundImage
                let index = nowImg.lastIndexOf('.') - 1
                let str = nowImg.split('')
                str[index] = str[index] == '3' ? 1 : Number.parseInt(str[index])  + 1
                const res =  str.join('')
                bird.style.backgroundImage = res
                
            },100)
        }


        // 选择宠物时判断当前选中宠物
        const selectionItem = ref(0)


        
        let timer = null
        onMounted(() => {


            // 首页相关
            if (!status.value) {
                // 定时器一直不断更新鸟儿的状态
                Time('.bird')
            }
        })



        // 选择宠物的键盘监听事件
        const keyInfo = ref()
        watch(status,(newValue) => {
            if (status.value === 1) {
                // 监听键盘事件
                document.addEventListener('keydown',ev => {

                    // 点击键盘后就会触发音效
                    document.querySelector('#shift-music').play()

                    // 根据情况来判断边界条件
                    switch (ev.key) {
                    case 'ArrowLeft':
                        if (selectionItem.value === 0 || selectionItem.value === 3) {
                            break
                        } else {
                            selectionItem.value -= 1
                        }
                        break
                    case 'ArrowRight':
                        if (selectionItem.value === 2 || selectionItem.value === 5) {
                            break
                        } else {
                            selectionItem.value += 1
                        }
                        break
                    case 'ArrowUp':
                        if (selectionItem.value === 0 || selectionItem.value === 1 || selectionItem.value === 2) {
                            break
                        } else {
                            selectionItem.value -= 3
                        }
                        break
                    case 'ArrowDown':
                        if (selectionItem.value === 3 || selectionItem.value === 4 || selectionItem.value === 5) {
                            break
                        } else {
                            selectionItem.value += 3
                        }
                        break
                    }
                })
            }
        },{
            deep: true,
            immediate: true
        })


        // 按钮的点击音效
        const clickButtonMusic = () => {
            document.querySelector('#switch-button').play()
        } 



        // 开始游戏
        const begain = () => {
            clearInterval(timer)
            status.value = 3    
            clickButtonMusic()
        }
        // 选择宠物
        const role = () => {
            clearInterval(timer)
            status.value = 1
            clickButtonMusic()
            selectionItem.value = 0
        }
        // 选择地图
        const map = () => {
            clearInterval(timer)
            status.value = 2
            clickButtonMusic()
        }
        // 退出游戏
        const quit = () => {
            clearInterval(timer)
            status.value = 4
            clickButtonMusic()
        }
        // 返回首页
        const callback = () => {
            status.value = 0
            Time('.bird')
            clickButtonMusic()
        }
        

        // 将方法返回
        return {
            status, begain, role, map, quit, roleList, selectionItem, callback
        }
    }
});

app.mount('#app');