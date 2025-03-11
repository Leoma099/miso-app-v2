<template>

    <div class="col-md-2 mb-3">

        <div>
            <div class="item">
                <img :src="getPhotoUrl(item.photo)" alt="User Photo" v-if="item.photo">
                <div class="overlay">
                    <router-link
                        :to="`/client/borrow/create?id=${item?.id}`">
                        VIEW
                    </router-link>
                </div>
            </div>
            <p class="item-title"><strong>{{ item.type }}</strong></p>
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
            return `http://127.0.0.1:8000/storage/${photoPath}`;
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
</style>
