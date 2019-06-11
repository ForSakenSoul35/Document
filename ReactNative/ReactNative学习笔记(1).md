## View组件
**概念**

创建UI时最基础的组件，绝大部分组件都继承了View组件的属性。
View是一个支持FlexBox布局，样式，一些触摸处理和一些无障碍功能的容器。并且可以放在其他的视图里，也可以有多个任意类型的子视图。
不论在什么平台上，View都会直接对应一个平台的原生视图，无论它是UIView，div还是android.view.View。

下面创建了一个View，里面包含了两个View
```
class ViewDemo extends Component {
  render(){
    return(
      <View style={{
        flexDirection:'row',
        height:100,
        padding:20
      }}>
        <View style={{backgroundColor:'red' flex: 0.3}}/>
        <View style={{backgroundColor:'blue' flex: 0.5}}/>
        <Text></Text>
      </View>
    )
  }
}
```
> View的设计初衷是为了搭配StyleSheet使用，这样是代码更清晰且获得更高的性能

## 常用属性

### 1.style属性 
style属性用于设置View的样式，可以设置多种属性，如下
#### 1.1 FlexBox 属性 

View组件支持FlexBox布局
#### 1.2 阴影属性
安卓手机上设置阴影与IOS上不一致，iOS使用shadow属性，Android使用elevation，但是效果不够好，推荐使用第三方库，react-native-shadow
##### 1.2.1shadow相关(iOS)
View组件提供了四种阴影属性，如下:
- shadowColor 设置阴影颜色 值：color
- shadowOffset 设置阴影位移值 值：{width:number,height:number}
- shadowOpacity 设置阴影透明度 值: number
- shadowRadius 设置阴影模糊半径 值：number
**注意：**设置View组件的阴影属性并没有什么意义，在View组件中定义这些属性是为了让继承它的组件可以各自去实现这个效果。**只有iOS平台可以使用shadow属性**
##### 1.2.2 elevation(Android)
elevation的值为number。Android平台没有shadow来设置阴影，但是可以用elevation属性来间接设置阴影。它使用Android原生的elevation API来设置组件的高度，这样就会在页面上呈现阴影的效果，**此效果只支持Android 5.0+**
#### 1.3 border相关
- borderStyle 边框样式
borderStyle的取值为三个，solid(实现边框)，dotted(点状边框)，dashed(虚线边框)
- borderColor 边框颜色
可以细分为 borderTopColor 、borderRightColor 、borderBottomColor 、borderLeftColor，取值为string
- borderRadius 边框圆角
可以细分为borderRadius 、borderTopLeftRadius 、borderTopRightRadius 、borderBottomLeftRadius 、borderBottomRightRadius，**top和bottom在前面，left和right在后面**，取值为number

**注意：**

如果不设置borderRadius,borderStyle的dotted和dashed的取值会失效。
##### 1.4 transform
transform的取值分为四种类型，translate(平移),scale(缩放),rotate(旋转),skew(倾斜)。
rotate和skew的区别，rotate在旋转的同时，不会改变组件本身的形态，而skew则随着倾斜角度的改变，组件的形态也会发生相应的变化。
View组件用transform属性的效果不是很明显，绝大部分组件都继承了View的transform属性。
##### 1.5 overflow(iOS)
overflow取值为visable，hidden，用来定义当View组件的子组件的宽高超过View组件宽高时的行为，默认值为hidden，即隐藏超出的部分。
oveflow只在iOS平台有效，在Android平台即使设置overflow为visable，呈现的还是hidden的效果。
##### 1.6 backgroundColor
设置背景颜色，默认为非常浅的灰色，只有**Text和TextInput**会继承父组件的背景颜色，其他的组件都要设置自己的背景颜色。
##### 1.7 opacity
opacity的值为0到1，当0时，表示组件完全透明，为1时，表示组件完全不透明。

#### 2.触摸事件回调函数
#### 3.removeClippedSubviews
#### 4.动画相关











#### 参考链接
1.官方文档
2.[React Native组件（二）View组件解析 \| 刘望舒的博客](http://liuwangshu.cn/rn/component/2-view.html)































