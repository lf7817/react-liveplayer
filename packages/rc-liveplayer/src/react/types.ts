import { CSSProperties, ReactNode } from 'react'

export interface LivePlayerEvents {
  /** m3u8 加载失败时触发通知消息, 参数: { type: '', message: ''} */
  onMessage?: (e: Event) => void
  /** 播放器出错回调, 参数: Error Object */
  onError?: (e: Event) => void
  /** 播放结束, 参数: 无 */
  onEnded?: (e: Event) => void
  /** 播放, 参数: 当前时间进度 */
  onPlay?: (e: Event) => void
  /** 进度更新, 参数: 当前时间进度 */
  onTimeUpdate?: (e: Event) => void
  /** 暂停, 参数: 当前时间进度 */
  onPause?: (e: Event) => void
  /** 全屏状态改变, 参数：true/false */
  onFullscreen?: (e: Event) => void
  /** 外部快照回调, 参数: 快照 Base64 数据 */
  onSnapOutside?: (e: Event) => void
  /** 内部快照回调, 由控制栏快照按钮触发, 参数: 快照 Base64 数据 */
  onSnapInside?: (e: Event) => void
  /** 自定义按钮点击回调, 参数：名称 */
  onCustomButtons?: (e: Event) => void
}

export interface LivePlayerNativeProps {
  /** 自定义叠加层 */
  'children'?: React.ReactNode
  /** 是否直播, 标识要不要显示进度条, Boolean default false */
  'live'?: boolean
  /** 视频流地址, 将 video-url 属性置为空即销毁 */
  'video-url'?: string
  /** 视频封面图片, String default '' */
  'poster'?: string
  /** 显示播放器控制栏, Boolean default true */
  'controls'?: boolean
  /** 是否循环播放, Boolean default false */
  'loop'?: boolean
  /** 视频流地址没有指定情况下, 视频所在区域显示的文字, 相当于 html img 标签的 alt 属性, String default '无信号' */
  'alt'?: string
  /** 是否静音, Boolean default true */
  'muted'?: boolean
  /** 视频显示区域的宽高比, fullscreen 即是全屏展示, String default '16:9', 设置 aspect='fullscreen'，父级元素加上 position: relative 即可自适应父级元素 */
  'aspect'?: string
  /** 指示加载状态, Boolean default false */
  'loading'?: boolean
  /** 流畅模式, Boolean default true */
  'fluent'?: boolean
  /** 是否拉伸, Boolean default false */
  'stretch'?: boolean
  /** m3u8 加载超时(秒), Number default 20 */
  'timeout'?: number
  /** 是否在工具栏显示自定义按钮(极速/流畅, 拉伸/标准), Boolean default true */
  'show-custom-button'?: boolean
  /** 是否隐藏起播状态下的大播放按钮, Boolean default false */
  'hide-big-play-button'?: boolean
  /** 是否隐藏 快照 按钮, Boolean default false */
  'hide-snapshot-button'?: boolean
  /** 是否隐藏 全屏 按钮, Boolean default false */
  'hide-fullscreen-button'?: boolean
  /** 是否隐藏 极速/流畅 按钮, Boolean default false */
  'hide-fluent-button'?: boolean
  /** 是否隐藏 拉伸/标准 按钮, Boolean default false */
  'hide-stretch-button'?: boolean
  /** HLS点播流播放时使用：需已有对应清晰度的HLS流，供选择的清晰度配置, 如 "yh,fhd,hd,sd" (说明：yh:原始分辨率，fhd:超清，hd:高清，sd:标清,不配置则不启用,需要提供多清晰度源，比如原画源是test.m3u8, 则hd源即为test_hd.m3u8), String default '' */
  'resolution'?: string
  /** HLS点播流播放时使用：默认播放的清晰度, String default 'hd' */
  'resolutiondefault'?: string
  /** HLS点播流播放时使用：倍速列表, Array default [0.5, 1, 2, 3] */
  'playback-rates'?: string
  /** HLS点播流播放时使用：默认倍速, Number default 1 */
  'playback-rate'?: number
  /** HTTP-FLV播放时使用: 是否有音频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断 */
  'hasaudio'?: boolean
  /** HTTP-FLV播放时使用: 是否有视频，传递该属性用于处理只有音频或只有视频的源, Boolean 默认不配置自动判断 */
  'hasvideo'?: boolean
  /** 自定义工具栏按钮, 配置模板(按钮名称[:class名称]), 多个用英文逗号分隔, 示例：custom-buttons="对讲,配置:vjs-icon-cog", String default '' */
  'custom-buttons'?: string
  /** 是否自动获取焦点, Boolean default false */
  'autofocus'?: boolean
  /** 是否双击全屏, Boolean default true */
  'dblclick-fullscreen'?: boolean
  /** 语言(zh-CN/en), String 默认不配置自动判断 */
  'language'?: string
  /** 是否自动播放, Boolean default false */
  'autoplay'?: boolean
  'ref'?: any
}

export interface LivePlayerProps extends LivePlayerOtherProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface LivePlayerOtherProps extends LivePlayerNativeProps, LivePlayerEvents {}

export interface LivePlayerRef {
  /** 播放 */
  play: () => any
  /** 暂停 */
  pause: () => any
  /** 获取暂停状态 */
  paused: () => any
  /** 获取当前播放时间进度, 同步返回播放时间进度数据 */
  getCurrentTime: () => any
  /** v2.2.5 设置当前播放时间进度, 即 seek */
  setCurrentTime: (time: any) => any
  /** 外部 API 方式获取快照, 快照获取成功后, 触发 snapOutside Event */
  snap: () => any
  /** 获取静音状态 */
  getMuted: () => any
  /** 设置静音状态 */
  setMuted: (flag: boolean) => any
  /** v1.7.6 获取全屏状态 */
  isFullscreen: () => boolean
  /** v1.7.6 触发全屏, 需要放置到交互事件回调中调用 */
  requestFullscreen: () => void
  /** v2.1.9 退出全屏, 需要放置到交互事件回调中调用 */
  exitFullscreen: () => void
  /** v2.1.9 触发全屏, 需要放置到交互事件回调中调用, 如果已处在全屏状态, 则退出全屏 */
  toggleFullscreen: () => void
  /** v1.7.7 获取音量 */
  getVolume: () => number
  /** v1.7.7 设置音量, 0~1 */
  setVolume: (num: number) => void
  /** v2.7.10 获取点播时长（秒） */
  getDuration: () => number
}

// @ts-expect-error
export interface PlayerDomRef extends HTMLElement, LivePlayerRef {}
