
export const VALIDATION_MESSAGES = {
  name: {
    required: `Please, enter recipient's name.`
  },
  phone: {
    required: 'Please, enter contact phone.',
    maxlength: 'Phone number length cannot exceed 50 symbols.'
  },
  email: {
    pattern: 'Please enter email in a valid format.',
    maxlength: 'Email address length cannot exceed 50 symbols.'
  },
  deliveryDate: {
    minDate: 'Delivery is possible only in 3 days.'
  },
  deliveryAddress: {
    required: 'Please enter delivery address.',
    maxlength: 'Delivery address length cannot exceed 100 symbols.',
    validAddress: `Delivery address should be either 'address-1' or 'address-2'.`
  },
  remark: {
    maxlength: 'Remark length cannot exceed 1000 symbols.'
  }
};
