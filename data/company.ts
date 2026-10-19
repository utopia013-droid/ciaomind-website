export const company = {
  name: 'CIAOMIND S.B. S.R.L.',
  address: 'Via Oroboni 78/A, 44122 Ferrara (FE), Italia',
  vat: '04260950136',
  rea: 'CO - 431951',
  pec: 'ciaomindsrl@pec.it',
  email: 'luxyoo.italy@gmail.com',
  phone: '+39 392 463 9169',
  website: 'https://www.ciaomind.com',
  year: '2026',

};

// 企业邮箱配置
export const emailConfig = {
  // Zoho Mail 配置
  zoho: {
    mxRecords: [
      { priority: 10, value: 'mx.zoho.com' },
      { priority: 20, value: 'mx2.zoho.com' },
      { priority: 50, value: 'mx3.zoho.com' },
    ],
    spfRecord: 'v=spf1 include:zoho.com ~all',
    dkimSelector: 'zoho',
  },
  
  // 建议的邮箱账户
  suggestedEmails: [
    { name: 'info', description: '通用咨诺邮箱' },
    { name: 'contact', description: '联系邮箱' },
    { name: 'support', description: '客户支持邮箱' },
    { name: 'sales', description: '销售邮箱' },
    { name: 'admin', description: '管理员邮箱' },
  ],
};
