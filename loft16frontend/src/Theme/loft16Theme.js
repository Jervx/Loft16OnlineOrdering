const myTheme = {
  modal: {
    base: "w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl",
  },
  textarea: {
    base: "block w-full text-sm dark:text-gray-300 rounded-md focus:outline-none",
    active:
      "focus:border-teal-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-teal-300",
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
    valid:
      "border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200",
    invalid:
      "border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
  },
  backdrop: {
    base: " filter backdrop-filter backdrop-blur-sm fixed inset-0 z-40 flex items-end bg-black bg-opacity-20 sm:items-center sm:justify-center",
  },
  link: {
    base: "text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent",
    active:
      "active:bg-transparent hover:bg-gray-100 focus:ring focus:ring-gray-300 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10",
    disabled: "opacity-50 cursor-not-allowed",
  },
  badge: {
    base: "inline-flex px-2 text-xs font-medium leading-5 rounded-full",
    success:
      "text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100",
    danger: "text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700",
    warning: "text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600",
    neutral: "text-gray-700 bg-gray-100 dark:text-gray-100 dark:loft-defbg",
    primary: "text-green-200 bg-green-100 dark:text-white dark:loft-defbg",
  },
  button: {
    size: {
      regular: "px-4 py-2 text-sm",
    },
    primary: {
      base: "text-white bg-teal-500 border border-transparent",
      active:
        "active:bg-teal-600 hover:bg-teal-700 focus:ring focus:ring-teal-300",
      disabled: "opacity-50 cursor-not-allowed",
    },
  },
  input: {
    base: "block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md",
    active:
      "focus:border-teal-100 border-gray-300 dark:border-gray-600 focus:ring focus:ring-teal-100 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700",
    disabled: "cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800",
    valid:
      "border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200",
    invalid:
      "border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200",
    radio:
      "text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-0 dark:focus:ring-gray-300",
    checkbox:
      "text-teal-600 form-checkbox focus:border-teal-400 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300",
  },
  dropdownItem: {
    base: 'mb-2 last:mb-0',
  },
  dropdown: {
    base:
      'absolute bg-white bg-opacity-90 filter backdrop-filter backdrop-blur-lg w-56 p-2 mt-2 text-gray-600 border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700',
    align: {
      left: 'left-0',
      right: 'right-0',
    },
  },
};

export default myTheme;
