interface 文案类型 {
  [key: string]: string
}

export const 文案映射: 文案类型 = {
  翻译服务: '在首页您可以通过「Tab」键快速切换翻译服务，最多选择4个翻译服务',
  主页显示顺序: '将根据「翻译服务」的勾选顺序进行排序',
  文本框字号: '可以输入14到20之间的数字，控制两个文本框的字号',
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
        「目标语种」为一个外语，该选项用来指定这个外语默认是什么，若
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
        ，但是你依然可以在语种下拉选择左侧点击
        <span i-simple-icons-adobeillustrator class="text-#777:70">
        </span>
        按钮
        <span class="text_important"> 手动开启 </span>
      </li>
    </ul>
  `,
  插件主题:
    '你可以通过在utools的基本设置中，将「主题」设置为「跟随系统」，即可实现易翻跟随utools，utools跟随你的系统主题的效果',
  语音朗读: `
    <p>
      翻译成功后，翻译结果文本框的左下角会出现语音朗读按钮
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
  朗读偏好:
    '系统默认是我们认为还不错的声音，不同的语种下有男声也有女声，你可以通过更改此选项，来指定朗读声音的性别',
  翻译服务数据: '你所申请翻译服务相关的数据，应该填写在此处对应的地方',
  配置信息:
    '不是utools会员？又想在多个设备上同步这些配置？导出会将配置信息写入你的剪贴板，利用配置信息可以在其他设备进行导入。',
}
