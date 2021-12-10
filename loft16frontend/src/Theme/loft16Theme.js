const myTheme = {
  button: {
    size: {
      regular: "px-4 py-2 text-sm",
    },
  },
  input: {
    base: 'block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md',
    active:
      'focus:border-pink-100 border-gray-300 dark:border-gray-600 focus:ring focus:ring-pink-100 dark:focus:border-gray-600 dark:focus:ring-gray-300 dark:bg-gray-700',
    disabled: 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800',
    valid:
      'border-green-600 dark:bg-gray-700 focus:border-green-400 dark:focus:border-green-400 focus:ring focus:ring-green-200 dark:focus:ring-green-200',
    invalid:
      'border-red-600 dark:bg-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring focus:ring-red-200 dark:focus:ring-red-200',
    radio:
      'text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-0 dark:focus:ring-gray-300',
    checkbox:
      'text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-offset-0 rounded dark:focus:ring-gray-300',
  },
};

export default myTheme;
