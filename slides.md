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

---
layout: center
---

# 历史演进：野人时代

<!-- 留空，待自行添加 -->

---
layout: center
---

# 历史演进：MVC

<!-- 留空，待自行添加 -->

---
layout: center
---

# 历史演进：MVP

<!-- 留空，待自行添加 -->

---

# MVVM 怎么做？

## 古法手写：INotifyPropertyChanged

```csharp {all|5|7-10}
// Model
public class User
{
    public string Name { get; set; }
}

// ViewModel (简化)
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
                OnPropertyChanged(nameof(UserName));
            }
        }
    }
    // ... PropertyChanged 实现
}
```

---

# MVVM 怎么做？

## ReactiveUI

```csharp {all|5|7-10}
// Model
public class User
{
    public string Name { get; set; }
}

// ViewModel (简化)
public class UserViewModel : ReactiveObject
{
    private string _userName;
    public string UserName
    {
        get => _userName;
        set => this.RaiseAndSetIfChanged(ref _userName, value);
    }
    // ... ReactiveCommand 示例
}
```

---

# MVVM 怎么做？

## CommunityToolkit.Mvvm

<!-- 留空，待自行添加 -->

---

---
layout: center
---

# 缺点和错误实践：大坨 ViewModel

- **问题**: ViewModel 过于庞大，包含过多业务逻辑，导致：
  - **难以维护**: 单一职责原则被打破，修改一处可能影响多处。
  - **难以测试**: 复杂的 ViewModel 难以编写单元测试。
  - **性能问题**: 过多的属性和逻辑可能导致性能下降。

## 示例：一个“大坨”的 ViewModel

```csharp {all|5-10}
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
