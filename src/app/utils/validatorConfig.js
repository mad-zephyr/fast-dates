const validatorConfig = {
  name: {
    isRequired: {
      message: 'Имя не может быть пустым'
    }
  },
  email: {
    isRequired: {
      message: 'Электронная почта обязательна для заполнения'
    },
    isEmail: {
      message: 'Email введен некорректно'
    }
  },
  password: {
    isRequired: {
      message: 'Пароль обязателен для заполнения'
    },
    isCapitalSymbol: {
      message: 'Пароль должен содержать хотя бы одну заглавную букву'
    },
    isContainDigit: {
      message: 'Пароль должен содержать хотя бы одно число'
    },
    min: {
      message: 'Пароль должен состоять минимум из 8 символов',
      value: 8
    }
  },
  reTypePassword: {
    isPasswordEqual: {
      message: 'Введенный пароль не совпадает'
    }
  },
  profession: {
    isRequired: {
      message: 'Выберите профессию'
    }
  },
  qualities: {
    isRequiredQualities: {
      message: 'Выберите хотя бы одно качество'
    }
  },
  licence: {
    isRequired: {
      message: 'Необходимо согласие с лицензионным соглашением'
    }
  },
  content: {
    isRequired: {
      message: 'Поле не может быть пустым'
    }
  },
  userId: {
    isRequired: {
      message: 'Ваберите свое имя'
    }
  }
}

export default validatorConfig
