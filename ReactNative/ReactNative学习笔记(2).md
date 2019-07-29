## RN组件的生命周期
组件的生命周期就是指组件初始化并挂载到虚拟DOM为起始，到组件从虚拟DOM卸载为终结。
生命周期的方法就是组件在虚拟DOM中不同状态的描述。
分为三个阶段：挂载，更新，卸载。
了解每个生命周期要做的事。
### 挂载
挂载指的是组件的实例被创建并插入到DOM中，挂载会调用以下方法。
#### constructor
constructor是RN组件的构造方法，需要在构造方法中最先调用`super(props)`。如果不需要初始化state，则不需要构造方法。

#### componentWillMount
componentWillMount在挂载之前被立即调用，在render方法之前被执行。因此在componentWillMount方法中设置state并不会导致重新被渲染。它只会执行一次，在通常情况下，建议使用constuctor方法替代它。
#### render
该方法是必须的，一旦调用，则会去检查this.props和this.state的数据并返回一个React元素。**render方法中不应该去修改组件的props和state**。render在更新阶段也会被调用，前提是shouldComponentUpdate返回true。
#### componentDidMount
componentDidMount方法在组件被挂载之后被立即调用，在render方法执行完后执行。开发者可以在这个方法中获取其中的元素和其子组件。子组件的componentDidMount会在父组件的componentDidMount方法之前被调用。
如果需要从网络上加载数据，可以在这里进行网络请求。
在componentDidMount中设置state将会被重新渲染。(可以更改state的地方)

### 更新
改变props和state都会导致组件更新，当一个组件被重新渲染时，会调用如下方法：
#### componentWillReceiveProps
componentWillReceiveProps会在挂载的组件收到新的props时被调用，它接收一个Object类型的参数-nextProps，表示新的props。通常在这个方法中监听新的props值，并根据props的变化，通过调用this.setState()来更新组件state，this.setState()不会触发render方法的调用。
在挂载的过程中，初始的props不会触发调用componentWillReceiveProps，这个方法只会在**组件中的props更新时调用**，另外调用this.setState()也不会触发该方法。
#### shouldComponentUpdate
当组件接收到新的state和props时，shouldComponentUpdate被调用。接收两个Object类型的参数，nextProps是新的props，nextState是新的state。
shouldComponentUpdate方法默认返回true，保证数据变化时，组件能够重新渲染。你也可以重载这个方法，通过检查变化前后props，来决定组件是否重新渲染 如果返回false，则组件不会被重新渲染，也不会调用本方法后面的componentWillUpdate和componentDidUpdate方法。

#### componentWillUpdate
如果组件的props或者state发生改变，并且此前的shouldComponentUpdate返回true，则会调用该方法。componentWillUpdate会在组件重新被渲染之前被调用。因此可以在这个方法中为重新渲染做一些准备工作。需要注意的是，在这个方法中，不能使用this.setState()来更改state。如果需要根据props更改state，请在componentWillReceiveProps方法中去实现。
#### componentDidUpdate
组件重新渲染完成后会调用componentDidUpdate方法。两个参数分别是渲染前的props和渲染前的state。这个方法也适合写网络请求，比如可以将当前的props和prevProps进行对比，发生变化则请求网络。
### 卸载
卸载就是从DOM中删除组件，会调用如下方法
#### componentWillUnmount
componentWillUnmount方法在组件卸载和销毁之前被立即调用。可以在这个方法中执行必要的清理工作，如关掉定时器，取消网络请求，清除组件装载中创建的DOM元素等。








### 参考链接
[React Native组件（一）组件的生命周期 \| 刘望舒的博客](http://liuwangshu.cn/rn/component/1-lifecycle.html)