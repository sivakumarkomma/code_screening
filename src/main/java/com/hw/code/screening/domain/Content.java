package com.hw.code.screening.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Content.
 */
@Entity
@Table(name = "content")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Content implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "header")
    private String header;

    @Column(name = "footer")
    private String footer;

    @Column(name = "paragraph")
    private String paragraph;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Content id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeader() {
        return this.header;
    }

    public Content header(String header) {
        this.setHeader(header);
        return this;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getFooter() {
        return this.footer;
    }

    public Content footer(String footer) {
        this.setFooter(footer);
        return this;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }

    public String getParagraph() {
        return this.paragraph;
    }

    public Content paragraph(String paragraph) {
        this.setParagraph(paragraph);
        return this;
    }

    public void setParagraph(String paragraph) {
        this.paragraph = paragraph;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Content)) {
            return false;
        }
        return id != null && id.equals(((Content) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Content{" +
            "id=" + getId() +
            ", header='" + getHeader() + "'" +
            ", footer='" + getFooter() + "'" +
            ", paragraph='" + getParagraph() + "'" +
            "}";
    }
}
