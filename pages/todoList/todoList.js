//获取应用实例
const app = getApp()

Page({
  data: {
    todoList:[],
    inputValue: '',
    todoLength:0,
    doneLength:0,
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: 'TodoList之旅'
    })
    var todoList = wx.getStorageSync("todoList") ? JSON.parse(wx.getStorageSync("todoList")) : [];
    if (todoList) {
      this.setData({
        todoList: todoList
      })
    }
    this.countLength(todoList);
  },
  add: function(e) {
    var value = e.detail.value;
    if(value === '') {
      wx.showToast({
        title: '请输入待办事项',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var todoList = this.data.todoList;
    todoList.push({value:value,checked:false});
    this.setData({
      todoList: todoList
    });
    this.savedata(todoList);
    this.countLength(todoList);
    this.setData({inputValue: ''});
  },
  deleteItem: function(e) {
    var todoList = this.data.todoList;
    var dataset = e.currentTarget.dataset;
    var index = dataset.index;
    todoList.splice(index,1);
    this.setData({todoList:todoList});
    this.countLength(todoList);
  },
  update: function(e) {
    var array = e.detail.value;
    var todoList = this.data.todoList;
    var todoType = e.currentTarget.dataset.type;
    if(todoType === 'doing') {
      todoList[array[0]].checked = true;
    }else {
      for (let i = 0; i < todoList.length; i++) {
        let item = todoList[i];
        item.checked = false;
      }
      for (let j = 0; j < array.length; j++) {
        let index = array[j];
        todoList[index].checked = true;
      }
    } 
    this.setData({
      todoList: todoList
    });
    this.savedata(todoList);
    this.countLength(todoList);
  },
  savedata: function(data) {
    wx.setStorageSync("todoList", JSON.stringify(data));
  },
  countLength: function(data) {
    var todoLength =0;
    var doneLength = 0;
    for(var item of data) {
      if(item.checked) {
        doneLength++;
      }else {
        todoLength++;
      }
    }
    this.setData({
      todoLength:todoLength,
      doneLength:doneLength
    })
  }
})