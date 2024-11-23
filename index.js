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

        // 背景图片地址
        const mapList = ref([
            './img/backgroud/airadventurelevel1.png',
            './img/backgroud/airadventurelevel2.png',
            './img/backgroud/airadventurelevel3.png',
            './img/backgroud/airadventurelevel4.png',
            './img/backgroud/airadventurelevel5.png',
            './img/backgroud/airadventurelevel6.png'
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

        // 选择地图时候的选择参数
        const mapItem = ref(0)
 
        let timer = null
        onMounted(() => {


            // 首页相关
            if (!status.value) {
                // 定时器一直不断更新鸟儿的状态
                Time('.bird')
            }
        })


        function setupKeyboardNavigation(selectionItem) {
            document.addEventListener('keydown', ev => {
                // 点击键盘后就会触发音效
                document.querySelector('#shift-music').play();
        
                // 根据情况来判断边界条件
                switch (ev.key) {
                    case 'ArrowLeft':
                        if (selectionItem.value !== 0 && selectionItem.value !== 3) {
                            selectionItem.value -= 1;
                        }
                        break;
                    case 'ArrowRight':
                        if (selectionItem.value !== 2 && selectionItem.value !== 5) {
                            selectionItem.value += 1;
                        }
                        break;
                    case 'ArrowUp':
                        if (selectionItem.value > 2) {
                            selectionItem.value -= 3;
                        }
                        break;
                    case 'ArrowDown':
                        if (selectionItem.value < 3) {
                            selectionItem.value += 3;
                        }
                        break;
                }
            });
        }



        // 选择宠物的键盘监听事件
        const keyInfo = ref()
        watch(status,(newValue) => {
            if (status.value === 1) {
                setupKeyboardNavigation(selectionItem)
            } else if (status.value === 2) {
                setupKeyboardNavigation(mapItem)
                
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

            const imagePath = `./img/background/airadventurelevel${mapItem.value + 1}.png`;

            console.log(imagePath);
            
            
            document.querySelector(':root').style.backgroundImage = imagePath
        }



        // 跳转到选择地图那
        const confirm = () => {
            status.value = 2
            clickButtonMusic()
        }
        // 选择宠物
        const role = () => {
            clearInterval(timer)
            status.value = 1
            clickButtonMusic()
            selectionItem.value = 0
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
        // 返回角色
        const backRole = () => {
            status.value = 1
            clickButtonMusic()
        }
        

        // 将方法返回
        return {
            status, begain, role, quit, roleList, selectionItem, callback, confirm, mapList, backRole, mapItem
        }
    }
});

app.mount('#app');