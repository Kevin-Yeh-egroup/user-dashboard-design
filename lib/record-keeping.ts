export type RecordType = 'income' | 'expense'

export type RecordEntry = {
  id: string
  date: string
  title: string
  category: string
  amount: number
  type: RecordType
  note?: string
}

export type RecordCategoryGroup = {
  label: string
  items: string[]
}

export type RecordCategoryDefinition = {
  label: string
  groups: RecordCategoryGroup[]
}

export const RECORD_DEFINITIONS: Record<RecordType, RecordCategoryDefinition[]> = {
  income: [
    {
      label: '月收入',
      groups: [
        {
          label: '生意收入 / 主要營業收入',
          items: ['商品銷售收入', '服務提供收入'],
        },
        {
          label: '生意收入 / 其他營業收入',
          items: ['二手設備出售', '場地出租', '合作分潤', '其他創業相關收入'],
        },
        {
          label: '生活收入 / 固定收入',
          items: ['薪資收入', '租金收入', '定期投資收益', '退休金/年金', '政府定期補助'],
        },
        {
          label: '生活收入 / 變動收入',
          items: ['副業收入', '臨時性工作', '利息收入', '親友贈與', '其他生活收入'],
        },
      ],
    },
    {
      label: '年度收入',
      groups: [
        {
          label: '生意年度收入 / 年度業績',
          items: ['年度銷售總額', '特殊季節營收'],
        },
        {
          label: '生意年度收入 / 年度專案收入',
          items: ['大型專案', '長期合約'],
        },
        {
          label: '生意年度收入 / 其他年度收入',
          items: ['政府補助', '投資收益', '其他'],
        },
        {
          label: '生活年度收入 / 固定年收入',
          items: ['年度薪酬'],
        },
        {
          label: '生活年度收入 / 投資收益',
          items: ['股票收益', '基金收益', '其他投資收益'],
        },
        {
          label: '生活年度收入 / 政府補助/津貼',
          items: ['年度政府補助總額'],
        },
        {
          label: '生活年度收入 / 非經常性收入',
          items: ['遺產繼承', '資產出售', '獎金或獎項', '其他偶發性收入'],
        },
        {
          label: '生活年度收入 / 其他',
          items: ['年度親友贈與總額', '其他無法歸類的年度收入來源'],
        },
      ],
    },
  ],
  expense: [
    {
      label: '生意支出',
      groups: [
        {
          label: '變動支出',
          items: ['原料', '包材', '耗材', '運費', '變動其他'],
        },
        {
          label: '固定支出',
          items: ['租金', '人事', '水電', '瓦斯', '通訊', '還款', '固定其他'],
        },
        {
          label: '額外支出',
          items: ['設備添購', '器材修繕', '行銷廣告', '額外其他'],
        },
      ],
    },
    {
      label: '生活支出',
      groups: [
        {
          label: '生活固定支出',
          items: ['住', '電信', '還款', '保險(月繳)', '儲蓄'],
        },
        {
          label: '生活變動支出',
          items: ['食', '衣', '行', '育', '樂', '醫療', '其他'],
        },
      ],
    },
    {
      label: '年支出',
      groups: [
        {
          label: '生意年度支出 / 稅金',
          items: ['營業稅', '營所稅'],
        },
        {
          label: '生意年度支出 / 保險費(年繳)',
          items: ['商業火災保險', '公共意外責任險', '產品責任險', '員工團體保險'],
        },
        {
          label: '生意年度支出 / 年度設備汰換',
          items: ['設備升級'],
        },
        {
          label: '生意年度支出 / 員工福利',
          items: ['年終獎金', '員工旅遊'],
        },
        {
          label: '生意年度支出 / 教育訓練',
          items: ['教育訓練'],
        },
        {
          label: '生意年度支出 / 其他',
          items: ['年度盤點損耗', '特殊專案支出'],
        },
        {
          label: '生活年度支出 / 稅金',
          items: ['綜合所得稅', '房屋稅', '地價稅'],
        },
        {
          label: '生活年度支出 / 保險費(年繳)',
          items: ['年度保險總額'],
        },
        {
          label: '生活年度支出 / 教育費用',
          items: ['學雜費', '補習費', '教材費'],
        },
        {
          label: '生活年度支出 / 年度計劃性支出',
          items: ['家庭旅遊', '節慶開支', '家電更新', '裝修費用'],
        },
        {
          label: '生活年度支出 / 投資與理財',
          items: ['定期投資', '子女教育基金', '退休金準備'],
        },
        {
          label: '生活年度支出 / 其他',
          items: ['計劃外重大支出', '特殊紀念活動', '捐贈與公益'],
        },
      ],
    },
  ],
}
