import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";
import { API_URL } from "../utils/config";

// get คือเป็นการเข้าถึงตัวแปรใน store ของเขาเอง
const ecomStore = (set, get) => ({
  //   key: value
  user: null,
  token: null,
  categories: [], // เอาไว้เก็บค่า listCategory
  products: [],
  carts: [],
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
  // function actionAddtoCart จะใช้ที่ปุ่มเพิ่มสินค้าเข้าตะกร้า
  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // Step Uniqe
    const uniqe = _.unionWith(updateCart, _.isEqual); // เพื่อให้สินค้าในตะกร้าไม่ซ้ำกัน ถ้ากดสินค้าอันเดิมซ้ำให้ทำการเพิ่ม count แทน
    set({ carts: uniqe });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log("Update Click", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    // console.log("Remove Click", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId), // ส่ง id product อันไหนมาก็จะถูกกรอง id product นั้นออก
    }));
  },
  // หาราคารวมทั้งหมด
  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  actionLogin: async (form) => {
    const res = await axios.post(`${API_URL}/api/login`, form);
    // console.log(res.data.token);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  // ทำ getCategory ให้เป็น globle state จะเรียกใช้ฟังก์ชั่น getCategory ได้ทุกที่
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data }); // นำข้อมูลไปเก็บไว้ใน categories
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data }); // นำข้อมูลไปเก็บไว้ใน products
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data }); // นำข้อมูลไปเก็บไว้ใน products
    } catch (err) {
      console.log(err);
    }
  },
  clearCart: () => {
    set({ carts: [] }); // ล้างข้อมูลใน carts ทั้งหมด
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
