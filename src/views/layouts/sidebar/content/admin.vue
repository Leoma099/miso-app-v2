<template>
  
    <div class="mb-3">

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/dashboard'">
                <i class="bx bx-category me-2"></i>Dashboard
            </router-link>
        </li>

        <!-- LIST -->
        <li>
            <a href="#" @click="toggleDropdown1()">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mb-0"><i class="bx bx-clipboard me-2"></i>List</div>
                    <i class="bx bx-caret-right" ref="caret1"></i>
                </div>
            </a>
            <ul :class="['dropdown', {'open': isDropdownOpen1}]">
                <li>
                    <router-link
                        :to="'/equipment/list'"
                        :class="{ 'active': $route.path.includes('/equipment/list')}">
                        <i class="bx bx-box me-2"></i>Available
                    </router-link>
                </li>
                <li>
                    <router-link
                        :to="'/pending/list'"
                        :class="{ 'active': $route.path.includes('/pending/list')}">
                        <i class="bx bx-box me-2"></i>Pending
                    </router-link>
                </li>
                <li>
                    <router-link
                        :to="'/borrow/list'"
                        :class="{ 'active': $route.path.includes('/borrow/list')}">
                        <i class="bx bx-archive me-2"></i>Borrow
                    </router-link>
                </li>
            </ul>
        </li>

        <!-- MANAGEMENT -->
        <li>
            <a href="#" @click="toggleDropdown2()">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mb-0"><i class="bx bx-clipboard me-2"></i>Manaagement</div>
                    <i class="bx bx-caret-right" ref="caret2"></i>
                </div>
            </a>
            <ul :class="['dropdown', {'open': isDropdownOpen2}]">
                <li>
                    <router-link
                        :to="'/management/equipment'"
                        :class="{ 'active': $route.path.includes('/management/equipment')}">
                        <i class="bx bx-box me-2"></i>Equipment
                    </router-link>
                </li>
                <li>
                    <router-link
                        :to="'/management/borrow'"
                        :class="{ 'active': $route.path.includes('/management/borrow')}">
                        <i class="bx bx-archive me-2"></i>Borrow
                    </router-link>
                </li>
                <li>
                    <router-link
                        :to="'/management/account'"
                        :class="{ 'active': $route.path.includes('/management/account')}">
                        <i class="bx bx-group me-2"></i>Account
                    </router-link>
                </li>
            </ul>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/track-equipment'">
                <i class="bx bx-search-alt-2 me-2"></i>Track Equipment
            </router-link>
        </li>

        <li>
            <router-link
                exact-active-class="active"
                :to="'/administration/equipment-release'">
                <i class="bx bx-send me-2"></i>Equipment Release
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/report')}"
                :to="'/administration/report'">
                <i class="bx bx-line-chart me-2"></i>Report and Analytic
            </router-link>
        </li>

        <li>
            <router-link
                :class="{ 'active': $route.path.includes('/administration/calendar')}"
                :to="'/administration/calendar'">
                <i class="bx bx-calendar me-2"></i>Calendar
            </router-link>
        </li>

        <!-- CATEGORY -->
         <li>
            <a href="#" @click="toggleDropdown3()">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mb-0"><i class="bx bx-category me-2"></i>Category</div>
                    <i class="bx bx-caret-right" ref="caret3"></i>
                </div>
            </a>
            <ul :class="['dropdown', {'open': isDropdownOpen3}]">
                <li>
                    <router-link
                        :class="{ 'active': $route.path.includes('/administration/department')}"
                        :to="'/administration/department'">
                        <i class="bx bx-building me-2"></i>Department
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ 'active': $route.path.includes('/administration/delivery')}"
                        :to="'/administration/delivery'">
                        <i class="bx bx-cart me-2"></i>Delivery
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ 'active': $route.path.includes('/administration/brand')}"
                        :to="'/administration/brand'">
                        <i class="bx bx-cart me-2"></i>Brand
                    </router-link>
                </li>
            </ul>
         </li>

    </div>

</template>

<script>
export default
{
    data()
    {
        return{
            isDropdownOpen1: false,
            isDropdownOpen2: false,
            isDropdownOpen3: false,
        }
    },

    methods:
    {
        toggleDropdown1()
        {
            this.isDropdownOpen1 = !this.isDropdownOpen1;
            this.$refs.caret1.classList.toggle('bx-caret-down');
            this.$refs.caret1.classList.toggle('bx-caret-right');
        },

        toggleDropdown2()
        {
            this.isDropdownOpen2 = !this.isDropdownOpen2;
            this.$refs.caret2.classList.toggle('bx-caret-down');
            this.$refs.caret2.classList.toggle('bx-caret-right');
        },

        toggleDropdown3()
        {
            this.isDropdownOpen3 = !this.isDropdownOpen3;
            this.$refs.caret3.classList.toggle('bx-caret-down');
            this.$refs.caret3.classList.toggle('bx-caret-right');
        }
    }
}
</script>

<style scoped>
ul.dropdown {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  opacity: 0;
}

ul.dropdown.open {
  max-height: 500px; /* Adjust to fit your content */
  opacity: 1;
}
</style>