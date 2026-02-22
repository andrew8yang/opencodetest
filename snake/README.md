# 🐍 贪吃蛇游戏

一个经典的贪吃蛇游戏，使用 HTML5 Canvas 和 JavaScript 开发。

**在线访问**：[贪吃蛇游戏](https://andrew8yang.github.io/opencodetest/)

## 🎮 游戏特点

- **经典玩法**：使用方向键控制蛇的移动，吃到食物得分
- **美观界面**：现代化的渐变设计，视觉效果出色
- **最高分记录**：自动保存最高分到本地存储
- **暂停功能**：按空格键或点击暂停按钮暂停游戏
- **响应式设计**：适配不同屏幕尺寸

## 🚀 如何运行

### 方法1：直接打开
1. 下载或克隆此仓库
2. 在浏览器中打开 `index.html` 文件
3. 点击"开始游戏"按钮开始游玩

### 方法2：使用本地服务器
```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js (需要安装 http-server)
npx http-server
```
然后在浏览器中访问 `http://localhost:8000`

## 🎯 游戏规则

1. **控制**：使用 ⬆️ ⬇️ ⬅️ ➡️ 方向键控制蛇的移动
2. **得分**：吃到红色食物获得10分，蛇身会增长
3. **失败条件**：
   - 撞到墙壁
   - 撞到自己的身体
4. **暂停**：按空格键或点击"暂停"按钮

## 🛠️ 技术栈

- **HTML5**：游戏界面结构
- **CSS3**：现代化样式和动画效果
- **JavaScript**：游戏逻辑和交互
- **Canvas API**：游戏渲染

## 📁 项目结构

```
opencode/
├── index.html      # 主HTML文件
├── style.css       # 样式文件
├── script.js       # 游戏逻辑
└── README.md       # 项目说明
```

## 🎨 自定义

### 调整游戏速度
在 `script.js` 中修改游戏循环间隔：
```javascript
gameLoop = setInterval(gameUpdate, 100); // 100ms = 10FPS
```

### 调整画布大小
在 `index.html` 中修改 canvas 元素的尺寸：
```html
<canvas id="gameCanvas" width="400" height="400"></canvas>
```

### 调整网格大小
在 `script.js` 中修改 gridSize 常量：
```javascript
const gridSize = 20;
```

## 📱 浏览器兼容性

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🎉 致谢

使用 [OpenCode](https://opencode.ai) AI 工具辅助开发

---

祝你玩得开心！🎮
