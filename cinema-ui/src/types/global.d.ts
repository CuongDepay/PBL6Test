import { FormRules } from 'element-plus';
declare global {
  /**
   * Interface Field Hidden Properties
   */
  interface FieldOption {
    key: number;
    label: string;
    visible: boolean;
  }

  /**
   * popup properties
   */
  interface DialogOption {
    /**
     * popup title
     */
    title?: string;
    /**
     * whether to display
     */
    visible: boolean;
    /**
     * Width
     */
    width: string;
    /**
     * Full screen option
     */
    fullscreen?: boolean;
    /**
     * Footer
     */
    footer?: boolean;
  }

  interface UploadOption {
    /** Set the upload request header */
    headers: { [key: string]: any };

    /** upload address */
    url: string;
  }

  /**
   * Import properties
   */
  interface ImportOption extends UploadOption {
    /** Whether to display the popup layer */
    // open: boolean;
    /** popup title */
    // title: string;
    /** Whether to disable upload */
    // isUploading: boolean;

    /** Other parameters */
    [key: string]: any;
  }
  /**
   * Dictionary Data Data Configuration
   */
  interface DictDataOption {
    label: string;
    value: string;
    elTagType?: ElTagType;
    elTagClass?: string;
  }

  interface BaseEntity {
    createBy?: any;
    createDept?: any;
    createTime?: string;
    updateBy?: any;
    updateTime?: any;
    checkbox?: boolean;
  }

  /**
   * Paged data
   * T : form data
   * D : query parameter
   */
  interface PageData<T, D> {
    form: T;
    queryParams: D;
    rules: FormRules;
  }
  /**
   * Pagination query parameters
   */
  interface PageQuery {
    pageNum: number;
    pageSize: number;
    orderByColumn: string;
    isAsc: string;
  }

  /**
   *
   */
  interface DatePickerProp {
    pickerType?: string;
    valueFormat?: string;
    format?: string;
    placeholder?: string;
  }

  /**
   *
   */
  interface SelectProp {
    // eslint-disable-next-line @typescript-eslint/ban-types
    selectFunc?: Function;
    dictData?: any;
    dataSource?: any;
    key?: string;
    label?: string;
    value?: string;
  }

  /**
   *
   */
  interface GridColumn {
    prop: string;
    name: string;
    size: number;
    show?: boolean; // Default true
    align?: string; // Default align center
    editor?: string; // Default string
    selectProps?: SelectProp; // Default none
    datePickerProps?: DatePickerProp; // Default none
    cellTemplate?: any; // Default none
    pin?: string; // Default none
    readonly?: boolean; // Default none
    sortable?: boolean; // Default none
    buttonProps?: any; // Default none
    switchFunc?: function; // Default none
    dictData?: any; // Default none
    validate?: any;
    required?: boolean;
    click?: any;
    formatter?: string;
    iconStatusProps?: GridIconStatus[];
    changeRowColor?: boolean;
    onChange?: any;
  }

  /**
   *
   */
  interface GridColumnValidate {
    validateCondition: function;
    validateText: string;
    color?: string;
  }

  /**
   *
   */
  interface GridIconStatus {
    prop?: string;
    dictData?: any;
    icon: string;
    visible?: any;
    tooltip?: string;
    color?: string;
    isCustom?: boolean;
    onClick?: function;
  }
}
export {};
