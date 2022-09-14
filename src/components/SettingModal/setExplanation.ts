interface 文案类型 {
  [key: string]: string
}

export const 文案映射: 文案类型 = {
  关于自动复制:
    'uTools在3.x版本移除了自动复制功能，3.x新创建的全局快捷键将无法设置自动复制，但若快捷键是在2.x版本创建的，且创建时打开了自动复制开关，则在3.x依旧生效，你可以安装2.x版本的uTools，打开自动复制后再升级到3.x',
  翻译服务: '在首页您可以通过「Tab」键快速切换翻译服务，最多选择4个翻译服务',
  主页显示顺序: '将根据「翻译服务」的勾选顺序进行排序',
  文本框字号: '可以输入14到20之间的数字，控制翻译界面两个文本框的字体大小',
  快捷键行为: '%s 可进行快捷键复制，该选项可设置按下快捷键后会发生什么',
  显示按钮:
    '翻译页底部会显示的按钮，请根据您的使用习惯勾选，勾选多个将会在翻译完成后，底部显示多个按钮，以应对不同的情况',
  默认目标外语: `
    <ul class=" space-y-10px overflow-auto flex-1">
      <li>
        如果在翻译界面开启了
        <span class="text_important">
          「智能切换语种」
        </span>
        <span i-simple-icons-adobeillustrator class="active_auto_btn">
        </span>
        ，将在翻译之前判断输入是否为中文，如果
        <span class="text_important">
          认定为中文
        </span>
        ，将会自动切换
        「目标语种」为一个外语，该选项用来指定这个外语默认是什么，如果
        <span class="text_important"> 不是中文 </span>
        ，则会切换为 “自动 → 中文” 尽可能免去你
        手动调整目标语种的这一步骤
      </li>
      <li>
        如果
        <span class="text_important">手动切换了</span>
        任一语种，易翻会认为自己猜错了，将自动关闭「智能切换语种」功能
        ，直至
        <span class="text_important">插件退出</span>
        ，但是你依然可以在语种下拉选择的左侧点击
        <span i-simple-icons-adobeillustrator class="text-#777:70">
        </span>
        按钮
        <span class="text_important"> 手动开启 </span>
      </li>
    </ul>
  `,
  插件主题:
    '你可以通过在uTools的基本设置中，将「主题」设置为「跟随系统」，即可实现易翻跟随uTools，uTools跟随你的系统主题的效果',
  语音朗读: `
    <p>
      翻译成功后，翻译结果文本框的左下角会出现语音朗读按钮，点击按钮或者按下 %s ，即可朗读翻译结果
    </p>
    <div class="mt-16px">
      <p>如果出现朗读失败，可以用以下方式解决</p>
      <ul class="list-disc pl-16px">
        <li>再次点击按钮重试</li>
        <li>保证系统时间与北京时间相同</li>
        <li>减少需要朗读的文字</li>
        <li>使用一个更科学的上网方式（你应该明白我的意思）</li>
      </ul>
    </div>
  `,
  朗读模式: `
  <div>
    <p class="mt-6px text-16px">质量优先：</p>
    <ul class="list-disc pl-16px">
      <li>极具表现力，拥有类似人类的声音</li>
      <li>支持易翻的所有语种</li>
      <li>朗读表现稳定</li>
      <li>加载速度较慢</li>
    </ul>
    <p class="mt-6px text-16px">速度优先：</p>
    <ul class="list-disc pl-16px">
      <li>比较生硬的机器声音</li>
      <li>仅支持目标语种为英文</li>
      <li>朗读表现视设备而定</li>
      <li>加载速度极快，无网络要求</li>
    </ul>
  </div>
  `,
  朗读偏好: `系统默认是我们认为还不错的声音，不同的语种下有男声也有女声，你可以通过更改此选项，来指定朗读声音的性别 <p class="text_important"> 速度优先模式下无效 </p>`,
  翻译服务数据: '你所申请翻译服务相关的数据，应该填写在此处对应的地方',
  配置信息:
    '不是uTools会员？又想在多个设备上同步这些配置？导出会将配置信息写入你的剪贴板，利用配置信息可以在其他设备进行导入。',
}
