---
theme: seriph
title: MVVM 主题展示
info: |
  ## MVVM 主题展示
  基于 Avalonia 项目的 MVVM 实践
class: text-center
transition: slide-left
mdc: true
---

# MVVM 主题展示

基于 Avalonia 项目的 MVVM 实践

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  点击进入 <carbon:arrow-right />
</div>

---

# MVVM 是什么？

- **Model (模型)**: 业务逻辑和数据。
- **View (视图)**: UI 界面，负责展示。
- **ViewModel (视图模型)**: 连接 View 和 Model，处理 View 的逻辑和数据绑定。

---

# 为什么选择 MVVM？

## UI 代码耦合问题

- 传统 UI 开发中，UI 逻辑与业务逻辑紧密耦合，难以维护和测试。

## 历史演进

- **MVC (Model-View-Controller)**: 视图和控制器紧密耦合。
- **MVP (Model-View-Presenter)**: Presenter 负责 View 和 Model 交互，View 接口化，但 Presenter 仍直接操作 View。

---

# MVVM 怎么做？

## 古法手写：INotifyPropertyChanged

```csharp {all|5|7-10|12-15}
// Model
public class User
{
    public string Name { get; set; }
}

// ViewModel
public class UserViewModel : INotifyPropertyChanged
{
    private User _user;
    public UserViewModel(User user) => _user = user;

    public string UserName
    {
        get => _user.Name;
        set
        {
            if (_user.Name != value)
            {
                _user.Name = value;
                OnPropertyChanged(nameof(UserName));
            }
        }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

// View (XAML)
// <TextBlock Text="{Binding UserName}" />
// <TextBox Text="{Binding UserName}" />
```

---

# MVVM 怎么做？

## ReactiveUI

```csharp {all|5|7-10|12-15}
// Model
public class User
{
    public string Name { get; set; }
}

// ViewModel
public class UserViewModel : ReactiveObject
{
    private User _user;
    public UserViewModel(User user) => _user = user;

    private string _userName;
    public string UserName
    {
        get => _userName;
        set => this.RaiseAndSetIfChanged(ref _userName, value);
    }

    // 示例：响应式命令
    public ReactiveCommand<Unit, Unit> SaveCommand { get; }

    public UserViewModel()
    {
        // 初始化 UserName
        UserName = _user.Name;

        // 命令示例：当 UserName 不为空时可执行
        SaveCommand = ReactiveCommand.CreateFromTask(async () =>
        {
            // 模拟保存操作
            await Task.Delay(100);
            Console.WriteLine($"Saving user: {UserName}");
        }, this.WhenAnyValue(x => x.UserName).Select(name => !string.IsNullOrWhiteSpace(name)));
    }
}

// View (XAML)
// <TextBlock Text="{Binding UserName}" />
// <TextBox Text="{Binding UserName}" />
// <Button Command="{Binding SaveCommand}" Content="Save" />
```

---

# MVVM 怎么做？

## CommunityToolkit.Mvvm

<!-- 留空，待自行添加 -->

---

# 缺点和错误实践

## 大坨 ViewModel

- ViewModel 过于庞大，包含过多逻辑，难以维护。

## 我的风味 MVVM

- 结合项目特点和团队习惯，灵活调整 MVVM 模式。
- 避免教条主义，以解决实际问题为导向。

---

# 图片引用建议

- **本地图片**: 将图片文件放在项目根目录下的 `public` 文件夹中（例如 `public/images/my_image.png`）。
- **引用方式**: 在 Markdown 中使用相对路径引用，例如 `![描述](/images/my_image.png)`。
- **Slidev 自动处理**: Slidev 会在构建时将 `public` 文件夹的内容复制到最终的输出目录，确保图片在部署后也能正常访问。

```markdown
![MVVM 架构图](/images/mvvm_architecture.png)
```

---
