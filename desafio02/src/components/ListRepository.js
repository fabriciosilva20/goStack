import React, { useState, useEffect } from 'react';
import api from "../services/api";

async function Excluir(id) {
  
  api.delete("repositories/" + id);

}

export default function ListRepository({ data }) {
  return (
    <ul>
      {data.map((r) => (
        <li key={r.id}>
          {r.title}{" "}
          <a href="#" onClick={() => Excluir(r.id)}>
            Excluir
          </a>
        </li>
      ))}
    </ul>
  );
}
