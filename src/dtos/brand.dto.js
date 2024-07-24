class BrandDto {
    constructor({ user_id, region_id, name, brand_url, description, brand_image, business_name, business_registration_number, contact }) {
        this.user_id = user_id;
        this.region_id = region_id;
        this.name = name;
        this.brand_url = brand_url;
        this.description = description;
        this.brand_image = brand_image;
        this.business_name = business_name;
        this.business_registration_number = business_registration_number;
        this.contact = contact;
    }
}

module.exports = BrandDto;
