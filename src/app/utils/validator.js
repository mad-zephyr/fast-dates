export function validator(data, config) {
  const errors = {}
  function validate(validateMethod, currentData, config) {
    let statusValidate

    switch (validateMethod) {
      case 'isRequired': {
        if (typeof currentData === 'boolean') {
          statusValidate = currentData === false
        } else if ((typeof currentData === 'string')) {
          statusValidate = currentData.trim() === ''
        }
        break
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(currentData)
        break
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g
        statusValidate = !capitalRegExp.test(currentData)
        break
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g
        statusValidate = !digitRegExp.test(currentData)
        break
      }
      case 'min': {
        statusValidate = currentData.length < config.value
        break
      }
      case 'isPasswordEqual' : {
        statusValidate = currentData !== data.password
        break
      }
      case 'isRequiredQualities' : {
        statusValidate = data.qualities.length === 0
        break
      }
      default:
        break
    }
    if (statusValidate) return config.message
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
