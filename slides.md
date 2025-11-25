---
theme: seriph
title: MVVM 主题展示
info: |
  ## MVVM 主题展示
  基于 Avalonia 项目的 MVVM 实践
class: text-center
transition: slide-left
mdc: true
presenter: false # 禁用工具栏
lineNumbers: true
colorSchema: 'light'
themeConfig:
  primary: '#523FC5'
  secondary: '#8376D5'
  text: '#3A2C91'
fonts:
  sans: 'Inter'
  serif: 'Inter'
  mono: 'Fira Code'
---

# MVVM 主题展示

副标题不知道写啥你就当没看到好了

---

# MVVM 是什么？

<img src="/images/wtf.png" alt="wtf" style="margin: auto" />

---
transition: fade
---

# MVVM 是什么？

- **Model (模型)**: 业务逻辑和数据。
- **View (视图)**: UI 界面，负责展示。
- **ViewModel (视图模型)**: 连接 View 和 Model，处理 View 的逻辑和数据绑定。

<img src="/images/mvvm.png" alt="mvvm" style="width: 150%;margin: auto" />

---

# 为什么选择 MVVM？

## UI 代码耦合问题

- 传统 UI 开发中，UI 逻辑与业务逻辑紧密耦合，难以维护和测试。

---
layout: center
---

# 在这之前

野生ui有野人帮忙解耦

<img src="/images/oldcoder.png" alt="oldcoder" style="width: 50%;margin: auto" />

---

# 在这之前
## MVC

<img src="/images/mvc.webp" alt="mvc" style="width: 50%;margin: auto" />

---

# 在这之前
## MVP

<img src="/images/mvp.png" alt="mvp" style="width: 75%;margin: auto" />

---

# 对比

| 架构 / 模式      | **MVC**                                     | **MVP**                                       | **MVVM**                                          |
| :--------------- | :------------------------------------------ | :-------------------------------------------- | :------------------------------------------------ |
| **中间层**       | Controller (控制器)                         | Presenter (展示器)                            | ViewModel (视图模型)                              |
| **View 的角色**  | **活跃**：包含少量UI逻辑，处理事件。      | **被动**：只显示数据，无逻辑，由Presenter驱动。 | **声明式**：纯UI，通过数据绑定与ViewModel交互。   |
| **View 知道谁？**| Model, Controller                           | Presenter (通过接口)                          | **不知道** ViewModel (通过数据绑定解耦)             |
| **中间层知道谁？**| Model, View                                 | Model, View (通过接口)                        | Model (不知道 View)                               |
| **交互方式**     | View直接报告Controller；Controller命令View更新。 | View通过事件通知Presenter；Presenter通过接口更新View。 | View通过命令绑定通知ViewModel；ViewModel通过数据绑定更新View。 |

---

# 对比

| 特性 / 模式      | **MVC**                                     | **MVP**                                       | **MVVM**  
| :--------------- | :------------------------------------------ | :-------------------------------------------- | :------------------------------------------------ |
| **耦合度**       | **中高** (View↔︎Controller)                  | **低** (View↔︎Presenter，通过接口)             | **极低** (View↔︎ViewModel，通过数据绑定)         |
| **可测试性**     | **一般** (Controller易测，View难测)         | **高** (Presenter纯逻辑，易测)                | **非常高** (ViewModel纯逻辑，独立于UI)              |
| **代码/复杂性**  | 初期简单，但Controller易臃肿。              | 适中 (接口和“胶水代码”略增)。                   | 初期学习曲线高，后期高效且规范。                    |
| **典型应用**     | 传统Web后端 (Rails, Django), iOS           | Android (提升可测性)                        | 现代Web前端 (Vue, React, Angular), 桌面/移动 (WPF, Xamarin) |

---

# 怎么做？

## 干嘛...

- 正向
  - INotifyPropertyChanged 
- 反向
  - Data Binding
  - ICommand
<img src="/images/mvvm.png" alt="mvvm" style="width: 50%;margin: auto" />

---

# 怎么做？

## 古法手写：INotifyPropertyChanged

```csharp {*|4-17}{maxHeight:'350px'}
// ViewModel
public class UserViewModel : INotifyPropertyChanged
{
    private string _userName;
    public string UserName
    {
        get => _userName;
        set
        {
            if (_userName != value)
            {
                _userName = value;
                OnPropertyChanged(nameof(UserName));  // 手动触发通知，下面还要实现这个方法
            }
        }
    }
    // ... PropertyChanged 实现
}
```

---

# 怎么做？

## ReactiveUI

用过一小段时间但是感觉不如...

```csharp {all|4-10}
// ViewModel
public class UserViewModel : ReactiveObject
{
    private string _userName;
    public string UserName
    {
        get => _userName;
        set => this.RaiseAndSetIfChanged(ref _userName, value); // ReactiveUI提供的方法
    }
    // ... ReactiveCommand 示例
}
```

---

# 怎么做？

## CommunityToolkit.Mvvm

`CommunityToolkit.Mvvm`为什么是神

```csharp {all|4-5}
// ViewModel
public class UserViewModel : ObservableObject
{
    [ObservableProperty]  // WTF???
    private string _userName;
}
```

---

# 怎么做？

## CommunityToolkit.Mvvm

啊怎么做到的

<img src="/images/source-generator-visualization.png" alt="source-generator-visualization" style="width: 100%;margin: auto" />

---

# 缺点和错误实践
## 大坨 ViewModel

- **问题**: ViewModel 过于庞大，包含过多业务逻辑，导致：
  - **难以维护**: 单一职责原则被打破，修改一处可能影响多处。
  - **难以测试**: 复杂的 ViewModel 难以编写单元测试。
  - **性能问题**: 过多的属性和逻辑可能导致性能下降。

---
transition: fade
---

# 缺点和错误实践：大坨 ViewModel
## 示例：一个“大坨”的 ViewModel

```csharp {all}
public class GodViewModel : ReactiveObject
{
    // 用户管理相关
    public ObservableCollection<User> Users { get; }
    public ReactiveCommand<Unit, Unit> LoadUsersCommand { get; }
    public ReactiveCommand<User, Unit> AddUserCommand { get; }

    // 产品管理相关
    public ObservableCollection<Product> Products { get; }
    public ReactiveCommand<Unit, Unit> LoadProductsCommand { get; }
    public ReactiveCommand<Product, Unit> UpdateProductCommand { get; }

    // 订单管理相关
    public ObservableCollection<Order> Orders { get; }
    public ReactiveCommand<Unit, Unit> LoadOrdersCommand { get; }
    public ReactiveCommand<Order, Unit> ProcessOrderCommand { get; }

    // ... 更多模块的逻辑
}
```

---
layout: center
---

# 缺点和错误实践：我的风味 MVVM

<!-- 留空，待自行添加 -->

---

# 图片引用建议

- **本地图片**: 将图片文件放在项目根目录下的 `public` 文件夹中（例如 `public/images/my_image.png`）。
- **引用方式**: 在 Markdown 中使用相对路径引用，例如 `![描述](/images/my_image.png)`。
- **Slidev 自动处理**: Slidev 会在构建时将 `public` 文件夹的内容复制到最终的输出目录，确保图片在部署后也能正常访问。

```markdown
![MVVM 架构图](/images/mvvm_architecture.png)
```

---
