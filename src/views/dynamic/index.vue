<template>
  <div class="bl-dynamic">
    <HpHeaderBar is-fixed has-occupy/>
  </div>
  <div class="dynamic-main flex mx-auto my-0 min-h-[150vh] bg-cyan-200 justify-center pt-2 relative">
    <!--   264 276, 724 736 318 -->
    <aside class="w-[264px] mr-3 min-w-[130px]">
      <div class="py-8 px-4 rounded-md bg-white h-40 min-w-[130px]">
        <div class="info_header h-12 flex">
          <img class="mr-2 rounded-full" src="/src/assets/avatar.png" width="48" height="48"/>
          <div>
            <div class="info_name text-sm font-bold">用户名</div>
            <HpSvgIcon name="level5" :size="30"/>
          </div>

        </div>
        <div class="info_content h-[39px] mt-[17px] flex justify-between text-xs text-[rgb(147,152,159)]">
          <div>
            <div class="mb-0.5 font-bold text-black text-center">218</div>
            <div>关注</div>
          </div>
          <div>
            <div class="mb-0.5 font-bold text-black text-center">2</div>
            <div>粉丝</div>
          </div>
          <div>
            <div class="mb-0.5 font-bold text-black text-center">28</div>
            <div>动态</div>
          </div>
        </div>
      </div>

      <div class="bg-white mt-2 sticky top-[72px] pt-4 pb-2 rounded-md">
        <div class="flex justify-between items-center px-2 flex-nowrap">
          <div class="font-bold text-[16px]">正在直播<span class="font-normal ml-1 text-sm text-[var(--text2)]">2</span>
          </div>
          <div class="left-more text-xs text-[rgb(147,152,159)] flex items-center cursor-pointer">
            <span class="text-nowrap">更多关注</span>
            <HpSvgIcon name="arrow" :size="10" class="ml-1 rotate-[-90deg] active"/>
          </div>
        </div>
        <ul class="px-1.5 pt-2">
          <li class="flex items-center mt-2 px-1.5 hover:bg-[rgb(246,247,248)] rounded-md py-2.5 cursor-pointer">
            <div class="w-[60px] h-12 mr-1 relative">
              <img width="40" height="40" class="rounded-full ml-1" src="/src/assets/avatar.png"/>
              <div class="w-[48px] h-[14px] rounded-xl bg-[var(--primary-color)] flex items-center relative mt-[-6px]">
                <div class="absolute w-[108px] h-[108px] live"></div>
                <div class="text-xs text-white scale-[65%] transform absolute right-0">直播中</div>
              </div>
            </div>
            <div class="flex-1 h-10 text-sm">
              <div class="text-sm mb-1 hover:text-blue-400">用户名</div>
              <div class="text-xs text-[var(--text2)]">上课啦</div>
            </div>
          </li>
          <li class="flex items-center mt-2 hover:bg-[rgb(246,247,248)] px-1.5 rounded-md py-2.5 cursor-pointer">
            <div class="w-[60px] h-12 mr-1 relative">
              <img width="40" height="40" class="rounded-full ml-1" src="/src/assets/avatar.png"/>
              <div class="w-[48px] h-[14px] rounded-xl bg-[var(--primary-color)] flex items-center relative mt-[-6px]">
                <div class="absolute w-[108px] h-[108px] live"></div>
                <div class="text-xs text-white scale-[65%] transform absolute right-0">直播中</div>
              </div>
            </div>
            <div class="flex-1 h-10 text-sm">
              <div class="text-sm mb-1 hover:text-blue-400">用户名</div>
              <div class="text-xs text-[var(--text2)]">上课啦</div>
            </div>
          </li>
        </ul>

      </div>
    </aside>
    <main class="w-[724px] mr-3 relative flex flex-col">
      <div class="rounded-md w-full max-h-[284px] p-5 pb-3 mb-2 bg-white">

        <div class="text-xs text-[var(--text2)] w-[85px] bg-[rgb(247,248,249)] rounded-xl flex items-center py-1">
          <HpSvgIcon name="topic" :size="14" class="mx-1 ml-2" :color="'rgb(201,204,208)'"/>
          <span>选择话题</span>
        </div>
        <textarea v-model="publish"
                  class="max-h-[180px] w-full mt-1 mb-3 mr-[14px] py-1 outline-none placeholder-[vat(--text2)] placeholder-size-[14px] text-[14px]"
                  placeholder="有什么想和大家分享的？">111111111111111111111111</textarea>
        <div class="flex justify-between items-center">
          <div class="left flex">
            <HpSvgIcon name="smile" :size="24" :color="'rgb(201,204,208)'" :hover-color="'rgb(0,174,236)'"/>
            <HpSvgIcon name="pic" class="ml-4" :size="24" :color="'rgb(201,204,208)'" :hover-color="'rgb(0,174,236)'"/>
            <HpSvgIcon name="aite" class="ml-4" :size="24" :color="'rgb(201,204,208)'" :hover-color="'rgb(0,174,236)'"/>
            <HpSvgIcon name="tongji" class="ml-4" :size="24" :color="'rgb(201,204,208)'"
                       :hover-color="'rgb(0,174,236)'"/>
            <HpSvgIcon name="live1" class="ml-4" :size="24" :color="'rgb(201,204,208)'"
                       :hover-color="'rgb(0,174,236)'"/>
          </div>
          <div class="right text-[rgb(201,204,208)] flex text-sm items-center">
            <span class="mr-2">{{ publish.length }}</span>|
            <HpSvgIcon name="setting" class="ml-2 mr-2.5" :size="24" :color="'rgb(201,204,208)'"
                       :hover-color="'rgb(0,174,236)'"/>
            <div
                class="bg-[rgb(125,211,243)] w-[70px] h-8 rounded-md text-white text-center leading-[32px] cursor-pointer"
                :class="publish.length > 0 ? 'publish-active':''">
              <button :disabled="publish.length>0">发布</button>
            </div>
          </div>
        </div>
      </div>


      <div class="h-[120px] rounded-md bg-white py-[5px] about">
        <div class="prev">
          <div class="shim"></div>
          <div class="left_shadow">
            <div class="prev_btn w-6 h-6" @click="handlePrev">
              <HpSvgIcon name="arrow" :size="12" class="transform rotate-90" :color="'rgb(201,204,208)'"
                         :hover-color="'rgb(0,0,0)'"/>
            </div>
          </div>
        </div>

        <div class="about-center h-full overflow-hidden ">
          <div class="about-content h-[100px] mt-[5px] flex" :style="containerStyle">
            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史1</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史2</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史3</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史4</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史5</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史6</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史7</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史8</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史9</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史10</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史11</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史12</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史13</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史14</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史15</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史16</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史17</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史18</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史19</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史20</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史21</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史22</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史23</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史24</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史25</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史26</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史27</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史28</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史29</div>
            </div>

            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史30</div>
            </div>
            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史31</div>
            </div>
            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史32</div>
            </div>
            <div class="inner relative">
              <img src="/src/assets/avatar.png" width="48" height="48"/>
              <div
                  class="border-[2px] border-white absolute w-3 h-3 bg-[rgb(0,174,236)] right-3 top-[44px] rounded-full"></div>
              <div class="name text-xs text-ellipsis text-[rgb(109,117,122)]">唠点历史33</div>
            </div>
          </div>
        </div>
        <div class="next transform rotate-180">
          <div class="shim"></div>
          <div class="right_shadow">
            <div class="next_btn w-6 h-6 bg-white" @click="handleNext">
              <HpSvgIcon name="arrow" :size="12" class="transform rotate-90" :color="'rgb(201,204,208)'"
                         :hover-color="'rgb(0,0,0)'"/>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-md w-full my-2 bg-white dynamic-tabs h-12 pl-5 flex flex-col justify-center">
        <div class="flex">
          <div class="mr-6 cursor-pointer hover:text-[rgb(0,174,236)]" @click="changeActive(0)"
               :class="activeTab ===0 ? 'tab-active-item':''">
            全部
          </div>
          <div class="mr-6 cursor-pointer  hover:text-[rgb(0,174,236)]" @click="changeActive(1)"
               :class="activeTab ===1 ? 'tab-active-item':''">
            视频投稿
          </div>
          <div class="mr-6 cursor-pointer  hover:text-[rgb(0,174,236)]" @click="changeActive(2)"
               :class="activeTab ===2 ? 'tab-active-item':''">
            追番追剧
          </div>
          <div class="mr-6 cursor-pointer  hover:text-[rgb(0,174,236)]" @click="changeActive(3)"
               :class="activeTab ===3 ? 'tab-active-item':''">
            专栏
          </div>
        </div>
        <div class="active-tab border-b-2 border-[rgb(0,174,236)] w-4 ml-[6px] mt-1" :style="tabActive"></div>
      </div>

      <div class="rounded-md w-full dynamic-list">
        <div class="py-0 pb-4 rounded-md pr-3 px-[88px] bg-white mb-2 relative">
          <div class="avatar h-[86.4px] w-[86.4px] absolute top-0 left-0 flex justify-center items-center">
            <img class="w-12 h-12 rounded-full" src="/src/assets/avatar.png"/>
          </div>
          <div>
            <div class="pt-4 flex justify-between">
              <div class="w-[600px]">
                <div class="text-[rgb(251,114,153)] font-bold w-[600px] cursor-pointer">
                  <a>罗翔说刑法</a>
                </div>
                <div class="text-[rgb(109,117,122)] text-xs mt-1 mb-2">45分钟前</div>
                <div class="whitespace-normal w-[600px] cursor-pointer text-sm">
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清；夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                </div>
                <div class="flex mt-1.5">
                  <div class="w-[236px] h-[132px] bg-blue-500 rounded-bl-md rounded-tl-md relative">
                    <img class="rounded-bl-md rounded-tl-md" src="/src/assets/bg2.jpg"/>
                    <!--                    蒙版-->
                    <div
                        class="inner-play opacity-0 hover:opacity-100 cursor-pointer absolute w-[236px] h-[132px] top-0 left-0 rounded-tl-md rounded-bl-md bg-[rgba(0,0,0,0.3)]">
                      <div class="w-7 h-7 bg-black rounded-md  absolute right-3 top-3 flex justify-center items-center">
                        <HpSvgIcon name="play" :size="20" :color="'white'"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 border-t border-r border-b rounded-tr-md rounded-br-md">
                    <div class="text-sm px-2 mt-1">【罗翔】留学在外洗钱涉案？第一次听说检察院还有法务章??</div>
                    <div
                        class=" text-xs text-[rgb(155,160,161)] px-2 h-[34px] w-[347px] text-ellipsis overflow-hidden text-wrap break-words mt-1">
                      在我看来在我看来，欺骗最大的问题就是把他人工具化sssssssssssssssssssssssss，让人成为工具人。让人郁闷的是，还有很多人打着我的名义招摇撞骗，还有人用我的名义和人谈人生，谈哲学，甚至还有谈恋爱的，感觉我都成AI了。，
                    </div>

                    <div class="flex mt-6 text-[rgb(155,160,161)]">
                      <div class="flex text-xs items-center mr-10 ml-2">
                        <HpSvgIcon name="ds" :size="16" class="mr-1"/>
                        5
                      </div>
                      <div class="flex text-xs">
                        <HpSvgIcon name="pl" :size="16" class="mr-1"/>
                        10
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <HpSvgIcon name="more" :size="24"/>
              </div>
            </div>

          </div>
          <div class="flex w-5/6 mt-4 justify-between">
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zf2" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="comment" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zan1" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
          </div>
        </div>


        <div class="py-10 pb-4 pr-3 rounded-md px-[88px] relative mb-2 bg-white">
          <div class="avatar h-[86.4px] w-[86.4px] absolute top-0 left-0 flex justify-center items-center">
            <img class="w-12 h-12 rounded-full" src="/src/assets/avatar.png"/>
          </div>
          <div>
            <div class="pt-4 flex justify-between">
              <div class="w-[600px]">
                <div class="text-[rgb(251,114,153)] font-bold w-[600px] cursor-pointer">
                  <a>罗翔说刑法</a>
                </div>
                <div class="text-[rgb(109,117,122)] text-xs mt-1 mb-2">45分钟前</div>
                <div class="whitespace-normal w-[600px] cursor-pointer text-sm">
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清；夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                </div>
                <div class="flex mt-1.5">
                  <div class="w-[236px] h-[132px] bg-blue-500 rounded-bl-md rounded-tl-md relative">
                    <img class="rounded-bl-md rounded-tl-md" src="/src/assets/bg2.jpg"/>
                    <!--                    蒙版-->
                    <div
                        class="inner-play opacity-0 hover:opacity-100 cursor-pointer absolute w-[236px] h-[132px] top-0 left-0 rounded-tl-md rounded-bl-md bg-[rgba(0,0,0,0.3)]">
                      <div class="w-7 h-7 bg-black rounded-md  absolute right-3 top-3 flex justify-center items-center">
                        <HpSvgIcon name="play" :size="20" :color="'white'"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 border-t border-r border-b rounded-tr-md rounded-br-md">
                    <div class="text-sm px-2 mt-1">【罗翔】留学在外洗钱涉案？第一次听说检察院还有法务章??</div>
                    <div
                        class=" text-xs text-[rgb(155,160,161)] px-2 h-[34px] w-[347px] text-ellipsis overflow-hidden text-wrap break-words mt-1">
                      在我看来在我看来，欺骗最大的问题就是把他人工具化sssssssssssssssssssssssss，让人成为工具人。让人郁闷的是，还有很多人打着我的名义招摇撞骗，还有人用我的名义和人谈人生，谈哲学，甚至还有谈恋爱的，感觉我都成AI了。，
                    </div>
                    <div class="flex mt-6 text-[rgb(155,160,161)]">
                      <div class="flex text-xs items-center mr-10 ml-2">
                        <HpSvgIcon name="ds" :size="16" class="mr-1"/>
                        5
                      </div>
                      <div class="flex text-xs">
                        <HpSvgIcon name="pl" :size="16" class="mr-1"/>
                        10
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <HpSvgIcon name="more" :size="24"/>
              </div>
            </div>
          </div>
          <div class="flex w-5/6 mt-4 justify-between">
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zf2" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="comment" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zan1" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
          </div>
        </div>


        <div class="py-10 pb-4 pr-3 rounded-md px-[88px] relative mb-2 bg-white">
          <div class="avatar h-[86.4px] w-[86.4px] absolute top-0 left-0 flex justify-center items-center">
            <img class="w-12 h-12 rounded-full" src="/src/assets/avatar.png"/>
          </div>
          <div>
            <div class="pt-4 flex justify-between">
              <div class="w-[600px]">
                <div class="text-[rgb(251,114,153)] font-bold w-[600px] cursor-pointer">
                  <a>罗翔说刑法</a>
                </div>
                <div class="text-[rgb(109,117,122)] text-xs mt-1 mb-2">45分钟前</div>
                <div class="whitespace-normal w-[600px] cursor-pointer text-sm">
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清；夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                  夏商周秦汉魏晋南北朝；隋唐五代十国；宋辽金西夏元明清
                </div>
                <div class="flex mt-1.5">
                  <div class="w-[236px] h-[132px] bg-blue-500 rounded-bl-md rounded-tl-md relative">
                    <img class="rounded-bl-md rounded-tl-md" src="/src/assets/bg2.jpg"/>
                    <!--                    蒙版-->
                    <div
                        class="inner-play opacity-0 hover:opacity-100 cursor-pointer absolute w-[236px] h-[132px] top-0 left-0 rounded-tl-md rounded-bl-md bg-[rgba(0,0,0,0.3)]">
                      <div class="w-7 h-7 bg-black rounded-md  absolute right-3 top-3 flex justify-center items-center">
                        <HpSvgIcon name="play" :size="20" :color="'white'"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex-1 border-t border-r border-b rounded-tr-md rounded-br-md">
                    <div class="text-sm px-2 mt-1">【罗翔】留学在外洗钱涉案？第一次听说检察院还有法务章??</div>
                    <div
                        class=" text-xs text-[rgb(155,160,161)] px-2 h-[34px] w-[347px] text-ellipsis overflow-hidden text-wrap break-words mt-1">
                      在我看来在我看来，欺骗最大的问题就是把他人工具化sssssssssssssssssssssssss，让人成为工具人。让人郁闷的是，还有很多人打着我的名义招摇撞骗，还有人用我的名义和人谈人生，谈哲学，甚至还有谈恋爱的，感觉我都成AI了。，
                    </div>
                    <div class="flex mt-6 text-[rgb(155,160,161)]">
                      <div class="flex text-xs items-center mr-10 ml-2">
                        <HpSvgIcon name="ds" :size="16" class="mr-1"/>
                        5
                      </div>
                      <div class="flex text-xs">
                        <HpSvgIcon name="pl" :size="16" class="mr-1"/>
                        10
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <HpSvgIcon name="more" :size="24"/>
              </div>
            </div>
          </div>
          <div class="flex w-5/6 mt-4 justify-between">
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zf2" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="comment" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
            <div class="flex text-[rgb(155,160,161)]">
              <HpSvgIcon name="zan1" :size="16" :color="'rgb(155,160,161)'" :hover-color="'rgb(0,174,236)'"/>
              <span class="text-xs ml-2">58</span>
            </div>
          </div>
        </div>
      </div>

    </main>
    <aside class="w-[318px]">

      <div class="w-full h-40 rounded-md mb-2 min-w-60">
        <img src="/src/assets/bg2.jpg" class="w-full h-40 rounded-md"/>
      </div>
      <div class="w-full py-2 bg-white rounded-md">
        <div class="font-bold pl-2 mb-5">话题</div>
        <ul class="px-1">
          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>
          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>
          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>

          <li class="h-[55px] rounded-md hover:bg-[rgb(247,248,249)] p-2 flex mb-1.5">
            <HpSvgIcon name="topic" :size="16" :color="'rgb(0,174,236)'" class="mr-2"/>
            <div>
              <div class="text-sm font-bold hover:text-[rgb(0,174,236)] mb-1">马龙无缘巴黎奥运会单打</div>
              <div class="text-[rgb(109,117,122)] text-xs">42.1万浏览·1116讨论</div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </div>

</template>
<script setup lang="ts">
import {useHpHeaderBarAndChannel} from "@/components/HpHeaderBar/hook.ts";
import HpHeaderBar from "@/components/HpHeaderBar/HpHeaderBar.vue";
import {computed, nextTick, ref} from "vue";

const publish = ref('');

// const contentContainer = ref<HTMLDivElement>();

const currentOffset = ref(0);

const dataLength = 31;

const totalWidth = 74 * dataLength;
/**
 * 最后一次跳后直接disabled
 */
const handleNext = () => {
  nextTick(() => {
    if (740 - currentOffset.value < totalWidth) {
      currentOffset.value = currentOffset.value - 74 * 10;
    } else {
      return;
    }
  })
}

const handlePrev = () => {
  nextTick(() => {
    if (currentOffset.value === 0) {
      return;
    }
    currentOffset.value = currentOffset.value + 74 * 10;
  })
}

const containerStyle = computed(() => {
  return {
    transform: 'translateX(' + currentOffset.value + 'px)'
  }
})
const activeTab = ref(0);
/**
 *
 */
const tabActive = ref({
  marginLeft: '6px'
})
const changeActive = (index: number) => {
  switch (index) {
    case 0:
      activeTab.value = 0;
      tabActive.value = {
        marginLeft: '6px'
      }
      break;
    case 1:
      activeTab.value = 1;
      tabActive.value = {
        marginLeft: '80px'
      }
      break;
    case 2:
      activeTab.value = 2;
      tabActive.value = {
        marginLeft: '170px'
      }
      break;
    case 3:
      activeTab.value = 3;
      tabActive.value = {
        marginLeft: '240px'
      }
      break;
  }
}


</script>

<style scoped lang="less">
.bl-dynamic {
  background: var(--bg-white);
  min-height: 64px;
  max-width: 2560px;
}

.left-more:hover {
  color: rgb(0, 174, 236);

  .active {
    color: rgb(0, 174, 236);
  }
}

.live {
  background-image: url("/src/assets/living_sprite.png");
  left: -44px;
  top: -46px;
  transform: scale(.0926);
  animation: liveSprite .5s steps(1) infinite;
}

.publish-active {
  background: rgb(0, 174, 236);

  &:hover {
    background: rgb(64, 197, 241);
  }
}

.about {
  position: relative;


  .prev {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    opacity: 0;
    transition: opacity .35s;
    display: flex;
    cursor: pointer;


    &:hover {
      opacity: 1;
    }

    .shim {
      height: 100%;
      width: 8px;
      background: #FFFFFF;
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
    }

    .left_shadow {
      background: linear-gradient(270deg, hsla(0, 0%, 100%, 0), #FFFFFF);
      display: flex;
      align-items: center;
      height: 100%;

      .prev_btn {
        width: 24px;
        border: #8d9fb9 solid 0.667px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }


  .next {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    opacity: 0;
    transition: opacity .35s;
    display: flex;
    height: 100%;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }


    .shim {
      height: 100%;
      width: 8px;
      background: #FFFFFF;
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
    }

    .right_shadow {
      background: linear-gradient(270deg, hsla(0, 0%, 100%, 0), #FFFFFF);
      display: flex;

      align-items: center;
      height: 100%;

      .next_btn {
        width: 24px;
        border: #8d9fb9 solid 0.667px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
}

.active-tab {
  transition: margin-left .3s ease-in-out;
}

.tab-active-item {
  color: rgb(0, 174, 236);
  font-weight: 600;
}

.about-content {
  .inner {
    min-width: 68px;
    width: 68px;
    margin-right: 6px;
    padding-top: 8px;
    display: flex;
    //justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: transform .5s;
    //pointer-events: none;


    &:hover {
      .name {
        color: rgb(0, 174, 236);
      }

      img {
        border: 1.5px solid rgb(0, 174, 236);

      }

    }

    img {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
    }

    .name {
      text-align: center;
      height: 18px;
      word-break: break-all;
      margin-top: 4px;
    }

  }


}


@keyframes liveSprite {
  0% {
    background-position: 0 0;
  }

  3.333% {
    background-position: -108px 0;
  }
  6.667% {
    background-position: -216px 0;
  }
  10% {
    background-position: -324px 0;
  }
  13.333% {
    background-position: -432px 0;
  }
  16.667% {
    background-position: -540px 0;
  }
  20% {
    background-position: -648px 0;
  }
  23.333% {
    background-position: -756px 0;
  }
  26.667% {
    background-position: -864px 0;
  }
  30% {
    background-position: -972px 0;
  }
  33.333% {
    background-position: -1080px 0;
  }
  36.667% {
    background-position: -1188px 0;
  }
  40% {
    background-position: -1296px 0;
  }
  43.333% {
    background-position: -1404px 0;
  }
  46.667% {
    background-position: -1512px 0;
  }
  50% {
    background-position: -1620px 0;
  }
  53.333% {
    background-position: -1728px 0;
  }
  56.667% {
    background-position: -1836px 0;
  }
  60% {
    background-position: -1944px 0;
  }
  63.333% {
    background-position: -2052px 0;
  }
  66.667% {
    background-position: -2160px 0;
  }
  70% {
    background-position: -2268px 0;
  }
  73.333% {
    background-position: -2376px 0;
  }
  76.667% {
    background-position: -2484px 0;
  }
  80% {
    background-position: -2592px 0;
  }
  83.333% {
    background-position: -2700px 0;
  }
  86.667% {
    background-position: -2808px 0;
  }
  90% {
    background-position: -2916px 0;
  }
  93.333% {
    background-position: -3024px 0;
  }
  96.667% {
    background-position: -3132px 0;
  }
  100% {
    background-position: -3240px 0;
  }
}
</style>