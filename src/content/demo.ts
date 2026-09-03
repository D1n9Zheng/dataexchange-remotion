export const DEMO_FLOW = {
  sourceSystem: '供应商 ERP',
  targetSystem: '采购企业 WMS',
  sourceProtocol: 'EDIFACT',
  messageType: 'ORDERS',
  version: 'D96A',
  targetFormat: 'JSON',
  sampleFile: 'purchase-order-orders.edi',
} as const;

export const PRODUCT_NAME = '数据交换工具';

