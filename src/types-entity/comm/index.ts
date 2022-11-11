
//答题历史表
export interface AnswerBase {
  account: string //阿帆题用户账号
  platformDomain: string //答题网站域名
  platformEmail: string //答题网站登陆邮箱
  onlyId: string //唯一id
  atRecordTime: string //当前记录时间

  status: number//状态
  hasRespondent: boolean //保留原请求的字段
  descriptionId: string //暂时保留的id
  platformAnswerDate: string //答题时间日期
  platformAnswerAmount: string //答题金额
}

//提现记录表
export interface AtAcCountBase {
  account: string //阿帆题用户账号
  platformDomain: string //答题网站域名
  platformEmail: string //答题网站登陆邮箱
  onlyId: string //唯一id
  atRecordTime: string //当前记录时间

  platformAtAcCountBalance: string //当前账号余额
  platformAtWithdrawalTime?: string //当前账号提现时间
  platformAtCashWithdrawalAmount: string //当前账号提现金额
}

//问卷表
export interface Questionnaire {
  account: string //阿帆题用户账号
  platformDomain: string //答题网站域名
  platformEmail: string //答题网站登陆邮箱
  onlyId: string //唯一id
  atRecordTime: string //当前记录时间

  answerAmoun: string//答题金额
  lengthOfInterview: number //问卷大概时间长度
  startUrl: string//问卷地址
  respondentGuid: string//暂时保留的id
}