<template>

    <div class="col-md-2 mb-3" v-if="!isUnavailable">

        <div>
            <router-link
                style="text-decoration: none; color: #000;"
                :to="`/client/borrow/create?id=${item?.id}`">

                <div class="miso-card">

                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <div class="miso-circle-available"></div>
                            <div class="ms-2">
                                <p class="mb-0 fw-bold">Available</p>
                            </div>
                        </div>

                        <div>
                            <span>Qty: {{ item.quantity }}</span>
                        </div>
                    </div>

                    <div class="miso-img">
                        <img :src="getPhotoUrl(item.photo)" alt="User Photo" v-if="item.photo">
                    </div>
                    <div class="miso-title">
                        <p>{{ item.type }}</p>
                    </div>
                </div>

            </router-link>
        </div>

    </div>

    <div class="col-md-2 mb-3" v-else>

        <div class="miso-card">

            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <div class="miso-circle-not-available"></div>
                    <div class="ms-2">
                        <p class="mb-0 fw-bold">Not Available</p>
                    </div>
                </div>
                <div>
                    <span>Qty: {{ item.quantity }}</span>
                </div>
            </div>

            <div style="opacity: 0.5;">
                <div class="miso-img">
                <img :src="getPhotoUrl(item.photo)" alt="User Photo" v-if="item.photo">
                </div>
                <div class="miso-title">
                    <p>{{ item.type }}</p>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default
{
    props:
    {
        item: Object,
    },

    data()
    {
        return{
            isUnavailable: this.item.quantity === 0
        }
    },

    methods:
    {
        getPhotoUrl(photoPath)
        {
            if (!photoPath) {
                return "/default-avatar.png"; // Fallback image
            }

            // If the photo is already a full URL, return as is
            if (photoPath.startsWith("http")) {
                return photoPath;
            }

            // Correct storage URL (Laravel serves files via public/storage)
            return `http://api.miso-backend.loc/storage/${photoPath}`;
        },
    }
};
</script>

<style scoped>
.button-signin {
    border: 2px solid #007bff;
    color: #007bff;
    transition: all 0.2s ease-in-out;
}
.button-signin:hover {
    background: #007bff;
    color: #ffffff;
    font-weight: 600;
}
.input-field {
    width: 60%;
}
.item
{
    position: relative;
    margin: 4px;
    width: 245px;
    height: 245px;
    overflow: hidden;
    cursor: pointer;
}

.item img
{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: 0.3s;
}

.item:hover img
{
    transform: scale(1.15);
}

.item .overlay
{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(70, 70, 70, 0.7);
    color: #fff;
    padding: 15px;
    overflow: hidden;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
}

.item:hover .overlay
{
    opacity: 1;
}

.item .overlay a
{
    display: inline-block;
    padding: 8px 16px;
    border: 2px solid #ffffff;
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
    transition: 0.3;
}

.item .overlay a:hover
{
    background: #ffffff;
    color: #000000;
}

.item-title
{
    font-size: 1.3rem;
}
.miso-card
{
    width: 250px;
    height: auto;
    padding: 10px;
    background: #ffffff;
    cursor: pointer;
}

.miso-card .miso-img
{
    position: relative;
    margin: 4px;
    width: 200px;
    height: 200px;
    overflow: hidden;
    cursor: pointer;
}
.miso-card .miso-img img
{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.miso-title
{
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
}
.miso-title p
{
    margin: 0;
}

.miso-circle-available
{
    display: block;
    background: green;
    width: 15px;
    height: 15px;
    border-radius: 100%;
}
.miso-circle-not-available
{
    display: block;
    background: red;
    width: 15px;
    height: 15px;
    border-radius: 100%;
}
</style>
