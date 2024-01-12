export interface DataHistoryVO {
  /**
   * System data history id
   */
  id: string | number;

  /**
   * Reference of record
   */
  refId: string | number;

  /**
   * New value of changed field
   */
  newValue: string;

  /**
   * Old value of changed field
   */
  oldValue: string;

  /**
   * Data field
   */
  dataField: string;

  /**
   * History type
   */
  histType: string;

  /**
   * Table name
   */
  tableName: string;

  /**
   * System type the same as the sy
   */
  systemType: string;

  /**
   *
   */
  createTime: string;

  /**
   *
   */
  username: string;
}

export interface DataHistoryForm extends BaseEntity {
  /**
   * System data history id
   */
  id?: string | number;

  /**
   * Reference of record
   */
  refId?: string | number;

  /**
   * New value of changed field
   */
  newValue?: string;

  /**
   * Old value of changed field
   */
  oldValue?: string;

  /**
   * Data field
   */
  dataField?: string;

  /**
   * History type (INSERT || UPDATE
   */
  histType?: string;

  /**
   * Table name
   */
  tableName?: string;

  /**
   * System type the same as the sy
   */
  systemType?: string;

  /**
   *
   */
  createTime?: string;

  /**
   *
   */
  username?: string;
}

export interface DataHistoryQuery extends PageQuery {
  /**
   * Reference of record
   */
  refId?: string | number;

  /**
   * New value of changed field
   */
  newValue?: string;

  /**
   * Old value of changed field
   */
  oldValue?: string;

  /**
   * Data field
   */
  dataField?: string;

  /**
   * History type (INSERT || UPDATE
   */
  histType?: string;

  /**
   * Table name
   */
  tableName?: string;

  /**
   * System type the same as the sy
   */
  systemType?: string;

  /**
   *
   */
  createTime?: string;

  /**
   *
   */
  username?: string;
}
