import React, { useState, useEffect } from "react";
// import { withRouter } from 'react-router-dom'

import './style.scss'

const initTimeStamp = Date.now()

const treeData = [
  {
    id: '1',
    level: 1,
    name: "公司总部",
    parentId: null,
    timeStamp: initTimeStamp,
    child: [
      {
        id: '1_1',
        level: 2,
        name: "技术部",
        parentId: 1,
        timeStamp: initTimeStamp,
        child: [
          {
            id: '1_1_1',
            level: 3,
            name: "前端开发部",
            parentId: '1_1',
            timeStamp: initTimeStamp,
            child: []
          }
        ]
      },
      {
        id: '1_2',
        level: 2,
        name: "市场部",
        parentId: '1',
        timeStamp: initTimeStamp,
        child: [
          {
            id: '1_2_1',
            level: 3,
            name: "市场一部",
            parentId: '1_2',
            timeStamp: initTimeStamp,
            child: []
          },
          {
            id: '1_2_2',
            level: 3,
            name: "市场二部",
            parentId: '1_2',
            timeStamp: initTimeStamp,
            child: []
          }
        ]
      }
    ]
  }
]

export default function Tree(props) {

  const [treeArr, setTreeArr] = useState(treeData)

  useEffect(() => {
    const timer = setInterval(refreshAge, 5000)
    return function () {
      clearInterval(timer)
    }
  }, [])

  const refreshAge = () => {
    const nowStamp = Date.now()
    const recuData = arr => {
      arr.map((item, index) => {
        if (item.timeStamp) {
          item.age = parseInt((nowStamp - item.timeStamp) / 1000)
        }
        item.child && item.child.length > 0 && recuData(item.child)
      })
    }
    const arr = [...treeArr]
    recuData(arr)
    setTreeArr(arr)
  }

  const onEditItem = (obj, text, type) => {
    const recuData = arr => {
      arr.map(item => {
        if (item.id === obj.id) {
          if (type === 1) {
            let timeStamp = Date.now()
            item.child.push({
              id: timeStamp,
              level: obj.level + 1,
              name: text,
              parentId: obj.id,
              timeStamp,
              child: []
            })
          } else {
            item.name = text
          }
        }
        item.child && item.child.length > 0 && recuData(item.child)
      })
    }
    const arr = [...treeArr]
    recuData(arr)
    setTreeArr(arr)
  }

  const onRemoveItem = (id) => {
    const recuData = arr => {
      arr.map((item, index) => {
        if (item.id === id) {
          arr.splice(index, 1)
        }
        item.child && item.child.length > 0 && recuData(item.child)
      })
    }
    const arr = [...treeArr]
    recuData(arr)
    setTreeArr(arr)
  }

  const onShowIcons = (id) => {
    const recuData = arr => {
      arr.map((item) => {
        item.isShowIcons = item.id === id ? !item.isShowIcons : false
        item.child && item.child.length > 0 && recuData(item.child)
      })
    }
    const arr = [...treeArr]
    recuData(arr)
    setTreeArr(arr)
  }

  const generateTree = (treeObj) => {

    let treeDom = [];

    if (treeObj instanceof Array) {
      let list = [];
      for (let item of treeObj) {
        list.push(generateTree(item));
      }
      treeDom.push(
        <ul className="tree_list" key={'treeItemGroup' + (treeObj[0] ? treeObj[0].parentId : '')}>
          {list}
        </ul>
      );
    } else {
      treeDom.push(
        <TreeItem item={treeObj} onEdit={onEditItem} onRemove={onRemoveItem} onShowIcons={onShowIcons} key={'treeItem' + treeObj.id}>
          {
            treeObj.child.length > 0 && generateTree(treeObj.child)
          }
        </TreeItem>
      );
    }
    return treeDom;
  }

  return (
    <div className="tree_box">
      {generateTree(treeArr)}
    </div>
  );
}


const TreeItem = props => {
  const { item, onEdit, onRemove, onShowIcons, children } = props

  const [state, setState] = useState({ isShowModal: false, editType: 1, editText: '', warnText: '' })

  const setMulState = (params) => {
    setState({ ...state, ...params })
  }

  const handleEdit = (type) => {
    setMulState({ isShowModal: true, editType: type, editText: type === 2 ? item.name : '' })
  }

  const handleSubmit = () => {
    let { editType, editText, warnText } = state;
    editText = editText.trim()
    warnText = !editText ? '请输入部门名称' : (editText.length > 20 ? '部门名称不能超出20个字符' : '')
    if (warnText) {
      setMulState({ warnText })
    } else {
      onEdit(item, editText, editType)
      setMulState({ isShowModal: false })

    }
  }

  const handleCloseModal = () => {
    setMulState({ isShowModal: false, warnText: '' })
  }


  const { isShowModal, editText, editType, warnText } = state;

  return (
    <li className="tree_item">
      {/* 当前部门名称栏 */}
      <div className="item_title_bar">
        <h3 className="item_name">{item.name} <span>{item.age ? `（${item.age}s）` : ''}</span></h3>
        {/* 按钮组 */}
        <div className={`icon_box ${item.isShowIcons ? 'show' : ''}`}>
          <i className="icon-more iconfont" onClick={onShowIcons.bind(this, item.id)}></i>
          <div className="icons_group">
            <i className="icon-add iconfont" onClick={handleEdit.bind(this, 1)}></i>
            <i className="icon-edit iconfont" onClick={handleEdit.bind(this, 2)}></i>
            <i className="icon-delete iconfont" onClick={onRemove.bind(this, item.id)}></i>
          </div>
          {/* 编辑弹窗 */}
          <div className={`edit_modal ${isShowModal ? 'show' : ''} ${editType === 2 ? 'is_edit' : ''}`}>
            <div className="mask" onClick={handleCloseModal}></div>
            <div className="modal_container">
              <h3>{editType === 1 ? '添加部门' : '编辑部门'}</h3>
              <input type="text" placeholder="请输入部门名称" value={editText} onChange={e => setMulState({ editText: e.target.value, warnText: '' })} />
              {warnText && <p className="warn_text">{warnText}</p>}
              <div>
                <button onClick={handleSubmit}>确定</button><button onClick={handleCloseModal}>取消</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      { children}
    </li>
  )
}



