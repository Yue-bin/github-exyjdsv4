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

# 免责声明

本演示大部分内容均为昨天夜观星象所得，如有不准确之处，欢迎指正。

<img src="/images/gemini.png" alt="gemini" style="width: 40%;margin: auto" />

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

传统代码隐藏模式中，UI与业务逻辑紧密耦合所导致的维护困难、测试复杂、修改成本高昂等问题。

MVVM通过实现关注点分离（解耦UI、UI逻辑和业务逻辑）带来以下主要优势：

1. 提高可测试性：ViewModel独立于UI，极易进行单元测试。
2. 增强可维护性与演进性：代码结构清晰，修改影响范围小。
3. 促进开发者与设计师协作：允许并行工作，提升开发效率。
4. 天然适配XAML平台：充分利用XAML的数据绑定机制，简化开发。

---

# 为什么选择 MVVM？

## UI 代码耦合问题

```csharp {all}{maxHeight:'350px'}
// 所有的逻辑都在这个按钮点击事件里，一坨大份
private void CalculateSum_Click(object sender, RoutedEventArgs e)
{
    // 1. UI交互逻辑：直接从文本框获取输入
    string inputA = txtNumberA.Text;
    string inputB = txtNumberB.Text;
    // 2. 数据验证逻辑：检查输入是否合法
    double numA, numB;
    bool isValidA = double.TryParse(inputA, out numA);
    bool isValidB = double.TryParse(inputB, out numB);
    if (!isValidA)
    {
        MessageBox.Show("请为'数字 A'输入有效的数字！", "输入错误", MessageBoxButton.OK, MessageBoxImage.Error);
        txtNumberA.Background = Brushes.LightCoral; // UI反馈
        return;
    }
    else
    {
        txtNumberA.Background = Brushes.White; // 恢复 UI 反馈
    }
    if (!isValidB)
    {
        MessageBox.Show("请为'数字 B'输入有效的数字！", "输入错误", MessageBoxButton.OK, MessageBoxImage.Error);
        txtNumberB.Background = Brushes.LightCoral; // UI反馈
        return;
    }
    else
    {
        txtNumberB.Background = Brushes.White; // 恢复 UI 反馈
    }
    // 3. 核心业务逻辑：执行计算
    double sum = numA + numB;
    // 4. UI呈现逻辑：直接更新显示结果的Label
    lblResult.Content = $"总和: {sum:F2}";
    // 5. 状态管理逻辑：假设我们可能需要跟踪一些内部状态
    // int clickCount++; // 每次点击加1，如果需要的话
    // 6. 假设这里还可能混合了一些数据访问代码 (为简洁省略，但可以想象)
    // SaveCalculationToDatabase(numA, numB, sum);
}
```

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
<img src="/images/mvvm.png" alt="mvvm" style="width: 75%;margin: auto" />

---

# 怎么做？

## 干嘛...

~~这图真帅吧~~

<img src="/images/databinding.png" alt="databinding" style="width: 50%;margin: auto" />

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
## 繁重与冗余与噪声

- **繁重：** 引入过多抽象层，导致架构复杂，增加认知负担。
- **冗余：** 产生大量样板代码（如数据映射、INotifyPropertyChanged通知），导致逻辑重复。
- **噪声：** 复杂的绑定语法和额外代码增加了代码噪声，影响可读性，在小型或简单场景下反而成为效率瓶颈。

---

# 缺点和错误实践
## 我的风味 MVVM
```csharp {all|1-3}
public MainWindowViewModel(MainWindow mainWindow)
{
    _mainWindow = mainWindow;
    EditorTabs = [
        new EditorTabViewModel { EditorTitle = "Untitled-1" }
    ];
    SelectedTab = EditorTabs[0];
    Messenger.Register<CloseTabMessage>(this, (recipient, message) =>
    {
        CloseTab(message.Tab);
        message.Reply(true); // 确认消息已处理
    });
    Messenger.Register<AddTabMessage>(this, (recipient, message) =>
    {
        AddNewTab();
        message.Reply(true); // 确认消息已处理
    });
}
```

---

# 参考文献

- [The MVVM Pattern - Microsoft](https://learn.microsoft.com/en-us/previous-versions/msp-n-p/hh848246(v=pandp.10))
- [MVVM 模式 - Avalonia](https://docs.avaloniaui.net/zh-Hans/docs/concepts/the-mvvm-pattern/)
- [MVVM 简介 - CommunityToolkit.Mvvm](https://learn.microsoft.com/zh-cn/dotnet/communitytoolkit/mvvm/)
- 个人经验以及偏见
- Gemini和豆包