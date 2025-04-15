
export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text'

    },
    {
        name: 'email',
        label: 'User Email',
        placeholder: 'Enter your user email',
        componentType: 'input',
        type: 'email'

    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'

    }
];

export const loginFormControls = [

    {
        name: 'email',
        label: 'User Email',
        placeholder: 'Enter your user email',
        componentType: 'input',
        type: 'email'

    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password'

    }
];

export const addProductFormElements = [
    {
        label: 'Title',
        name: 'title',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter product title'
    },
    {
        label: 'Description',
        name: 'description',
        componentType: 'textarea',
        placeholder: 'Enter product description'
    },
    {
        label: 'Category',
        name: 'category',
        componentType: 'select',
        options: [
            { id: 'Men', label: 'Men' },
            { id: 'Women', label: 'Women' },
            { id: 'Kids', label: 'Kids' },
            { id: 'Acessories', label: 'Acessories' },
            { id: 'Footwear', label: 'Footwear' },
        ]
    },
    {
        label: 'Brand',
        name: 'brand',
        componentType: 'select',
        options: [
            { id: 'Nike', label: 'Nike' },
            { id: 'Adidas', label: 'Adidas' },
            { id: 'Puma', label: 'Puma' },
            { id: "Levi's", label: "Levi's" },
            { id: 'Zara', label: 'Zara' },
            { id: 'H&M', label: 'H&M' }
        ]
    },
    {
        label: 'Price',
        name: 'price',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter product price'
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter sale price (optional)'
    },
    {
        label: 'Total Stock',
        name: 'totalStock',
        componentType: 'input',
        type: 'number',
        placeholder: 'Enter total stock'
    },
];


export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'
    },
    {
        id: 'men',
        label: 'Mens',
        path: '/shop/listing'
    },
    {
        id: 'women',
        label: 'Womens',
        path: '/shop/listing'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/listing'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing'

    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing'

    }
]

export const sortOptions = [
    {id: 'price-lowtohigh', label: 'Price Low to High'},
    {id: 'price-hightolow', label: 'Price High to Low'},
    {id: 'title-atoz', label: 'Title A to Z'},
    {id: 'title-ztoa', label: 'Title Z to A'},
]

export const filterOption = {
    category: [
        {
            id: "Men",
            label: "Men"
        },
        {
            id: "Women",
            label: "Women"
        },
        {
            id: "Kids",
            label: "Kids"
        },
        {
            id: "Accessories",
            label: "Accessories"
        },
        {
            id: "Footwear",
            label: "Footwear"
        }
    ],
    brand: [
        { id: 'Nike', label: 'Nike' },
        { id: 'Adidas', label: 'Adidas' },
        { id: 'Puma', label: 'Puma' },
        { id: "Levi's", label: "Levi's" },
        { id: 'Zara', label: 'Zara' },
        { id: 'M&m', label: 'H&M' }
    ]
}


export const addressFormControls = [
    {
        label: 'Address',
        name: 'address',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your address.'
    },
    {
        label: 'City',
        name: 'city',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your city.'
    },
    {
        label: 'Pincode',
        name: 'pincode',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your pincode.'
    },
    {
        label: 'Phone No.',
        name: 'phone',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your phone number.'
    },
    {
        label: 'Notes',
        name: 'notes',
        componentType: 'textarea',
        placeholder: 'Enter additional info'
    }
]