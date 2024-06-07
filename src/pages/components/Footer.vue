<script setup lang="ts">
</script>

<template>
  <q-footer class="ec-footer">
    <div class="footer-links">
      <ul>
        <li><a href="#">会社概要</a></li>
        <li><a href="#">利用規約</a></li>
        <li><a href="#">プライバシーポリシー</a></li>
        <li><a href="#">お問い合わせ</a></li>
      </ul>
    </div>
    <div class="copyright">
      <p>&copy; 2024 ECサイト名. All Rights Reserved.</p>
    </div>
  </q-footer>
</template>

<style scoped>
.ec-footer {
  background-color: #343a40; /* フッターの背景色 */
  color: #fff; /* テキスト色 */
  padding: 20px;
  text-align: center;
}

.footer-links ul {
  list-style-type: none;
  padding: 0;
}

.footer-links li {
  display: inline-block;
  margin-right: 20px;
}

.footer-links a {
  text-decoration: none;
  color: #fff; /* リンクの色 */
}

.footer-links a:hover {
  color: #007bff; /* ホバー時のリンクの色 */
}

.copyright p {
  margin: 0;
  font-size: 14px;
}
</style>
