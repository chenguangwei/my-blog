---
title: "视频嵌入功能演示"
date: "2024-02-01"
excerpt: "展示如何在博客文章中嵌入视频，支持本地视频、YouTube、Bilibili 等多种来源。"
tags: ["教程", "视频", "功能演示"]
language: "zh"
author: "Your Name"
---

## 视频嵌入功能

本博客支持在 Markdown 文章中直接嵌入视频内容，包括本地视频文件和第三方视频平台。

## 本地视频

使用 HTML5 `<video>` 标签嵌入本地视频：

<video controls>
  <source src="/videos/demo.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>

### 带封面图的视频

<video controls poster="/images/video-poster.jpg">
  <source src="/videos/demo.mp4" type="video/mp4">
  <source src="/videos/demo.webm" type="video/webm">
  您的浏览器不支持视频播放。
</video>

### 自动播放（静音）

<video autoplay muted loop playsinline>
  <source src="/videos/background.mp4" type="video/mp4">
</video>

## 使用方法

### 基础语法

在 Markdown 文件中直接写 HTML：

```html
<video controls>
  <source src="/videos/your-video.mp4" type="video/mp4">
  您的浏览器不支持视频播放。
</video>
```

### 常用属性

| 属性 | 说明 |
|------|------|
| `controls` | 显示播放控制栏 |
| `autoplay` | 自动播放（需配合 muted） |
| `muted` | 静音 |
| `loop` | 循环播放 |
| `poster` | 封面图片 |
| `playsinline` | 内联播放（移动端） |
| `preload` | 预加载策略：auto/metadata/none |

### 完整示例

```html
<video 
  controls 
  poster="/images/cover.jpg"
  preload="metadata"
>
  <source src="/videos/video.mp4" type="video/mp4">
  <source src="/videos/video.webm" type="video/webm">
  您的浏览器不支持视频播放。
</video>
```

## 嵌入 YouTube 视频

使用 iframe 嵌入 YouTube：

<iframe 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="YouTube video player" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

### YouTube 嵌入代码

```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="视频标题" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

## 嵌入 Bilibili 视频

<iframe 
  src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1" 
  scrolling="no" 
  border="0" 
  frameborder="no" 
  framespacing="0" 
  allowfullscreen="true">
</iframe>

### Bilibili 嵌入代码

```html
<iframe 
  src="//player.bilibili.com/player.html?bvid=YOUR_BVID&page=1" 
  scrolling="no" 
  border="0" 
  frameborder="no" 
  framespacing="0" 
  allowfullscreen="true">
</iframe>
```

## 带说明的视频

使用 `<figure>` 和 `<figcaption>` 添加视频说明：

<figure>
  <video controls>
    <source src="/videos/demo.mp4" type="video/mp4">
  </video>
  <figcaption>图 1：演示视频 - 展示产品核心功能</figcaption>
</figure>

## 响应式视频容器

对于需要保持特定比例的视频：

<div class="video-container">
  <video controls>
    <source src="/videos/widescreen.mp4" type="video/mp4">
  </video>
</div>

## 音频嵌入

同样支持音频文件：

<audio controls>
  <source src="/audio/podcast.mp3" type="audio/mpeg">
  您的浏览器不支持音频播放。
</audio>

## 最佳实践

1. **提供多种格式**：同时提供 MP4 和 WebM 格式以获得最佳兼容性
2. **添加封面图**：使用 `poster` 属性提升用户体验
3. **考虑移动端**：添加 `playsinline` 属性
4. **注意文件大小**：压缩视频以加快加载速度
5. **提供备用文本**：为不支持视频的浏览器提供说明

## 视频文件存放

将视频文件放在 `public/videos/` 目录下，然后使用 `/videos/filename.mp4` 路径引用。

```
public/
└── videos/
    ├── demo.mp4
    ├── demo.webm
    └── background.mp4
```

---

现在你可以在任何文章中使用这些视频嵌入功能了！

